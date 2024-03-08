import projectGroupModel from "../../../../DB/model/group.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { generateToken, verifyToken } from "../../../Services/generateAndVerify.js";
import { sendEmail } from "../../../Services/sendEmail.js";

export const createGroupProject = asyncHandler(async (req, res, next) => {
    const { projectname, description, members } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }

    console.log(req.headers.host);

    const membersData = [];
    for (const memberData of members) {
        const { email, task } = memberData;
        const member = await userModel.findOne({ email: email });
        if (!member) {
            // If any member doesn't exist, you can handle this error as needed
            return next(new Error(`User with email ${email} not found`, { cause: 404 }));
        }
        membersData.push({
            userId: member._id.toString(),
            task: task,
        });
    }

    const newProject = await projectGroupModel.create({
        projectname: projectname,
        description: description,
        members: membersData,
    });

    const projid = newProject._id;
   
    // Sending email to each member individually, adjust as needed
    for (const memberData of members) {
        let email = memberData.email;
        const token = generateToken({ email, projid }, process.env.SIGNUP_TOKEN, 60 * 5);
        const refreshToken = generateToken({ email, projid }, process.env.SIGNUP_TOKEN, 60 * 60 * 24);

        const link = `${req.protocol}://${req.headers.host}/project/confirmEmail/${token}`;
        const Rlink = `${req.protocol}://${req.headers.host}/project/newConfirmEmail/${refreshToken}`;
        const html = `<a href="${link}">Accept invitation</a>  <br/> <br/> <br/> <a href="${Rlink}"> send new email </a> `;
   
        await sendEmail(memberData.email, 'confirm email', html);
    }

    console.log(projid);
    return res.status(200).json({ message: "Project deleted group created", projid });
});



export const confirmEmail = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const decoded = verifyToken(token, process.env.SIGNUP_TOKEN);
    const projid = decoded.projid;
    const user = await userModel.findOne({ email: decoded.email })
    const proj = await projectGroupModel.findById(projid)
    console.log(user);
    if (!decoded?.email || !projid) {
        return next(new Error("invalid token payload", { cause: 409 }));
    }
    if (!proj) {
        return next(new Error(`No projects added`));
    }
    let updated = false;
    for (let i = 0; i < proj.members.length; i++) {
        if (proj.members[i].userId.toString() === user._id.toString()) {
            proj.members[i].confirm = true;
            await proj.save();
            updated = true;
            break;
        }
    }
    if (updated) {
        return res.status(200).redirect(`${process.env.URL}`);
    } else {
        return next(new Error("not register account or ur email is verify", { cause: 400 }))
    }
})