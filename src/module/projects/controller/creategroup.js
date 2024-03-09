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
        createdby:user._id,
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
   
        await sendEmail(memberData.email, 'Project Invitation', html);
    }

    
    return res.status(200).json({ message: "Success Project group is created", newProject });
});



export const confirmEmail = asyncHandler(async (req, res) => {

    const { token } = req.params;
    const decoded = verifyToken(token, process.env.SIGNUP_TOKEN);
    const projid = decoded.projid;
    const user = await userModel.findOne({ email: decoded.email })
    const proj = await projectGroupModel.findById(projid)
    
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
export const updatestatus=asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const taskstatus=req.body.taskstatus
    let  task;
    const confirm=await projectGroupModel.findById(id)
    let updated = false;
    for(let i=0;i<confirm.members.length;i++)
    {
        if (confirm.members[i].confirm === true) {
            task=confirm.members[i].task
                confirm.members[i].taskstatus=taskstatus
                await confirm.save();
                updated = true;
                break;
            
        }
    }

    if (updated) {
       
    return res.status(200).json({ message: `${task} task for ${confirm.projectname} project is done by : ${user.email} ` });
    } else {
        return next(new Error("not register account or ur email is verify", { cause: 400 }))
    }
})
export const getinformation=asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
 
    const project=await projectGroupModel.findById(id)
    const owner=project.createdby
    if(user._id.toString() != owner.toString())
    {
        return res.status(404).json({ message: "You are not able to access this information" });
    }  
    return res.status(200).json({ message: 'Your Project information is ',project});  

});

export const deletegroup=asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
    const project=await projectGroupModel.findById(id)
    const owner=project.createdby
    if(user._id.toString() != owner.toString())
    {
        return res.status(404).json({ message: "You are not able to delete this information" });
    }  
    await projectGroupModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Project deleted successfully" });
});


export const deleteuserfromgroup=asyncHandler(async(req,res,next)=>{
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`Please sign up first `, { cause: 400 }));
    }
    const project = await projectGroupModel.findById(id);
    const owner = project.createdby;
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    if (user._id.toString() !== owner.toString()) {
        return res.status(404).json({ message: "You are not able to update project information" });
    } 
    else
   { const useremail = await userModel.findOne({ email: req.body.email });
    if (!useremail) {
        return res.status(404).json({ message: "User not found" });
    }
    const userIdToDelete = useremail._id.toString();
    let deleted = false;
    for (let i = 0; i < project.members.length; i++) {
        if (project.members[i].userId.toString() === userIdToDelete) {
            project.members.splice(i, 1); // Remove the member at index i
            deleted = true;
            break;
        }
    }
    if (!deleted) {
        return res.status(404).json({ message: "User is not a member of this project" });
    }
    await project.save();
    return res.status(200).json({ message: "User deleted from the project" });
}

})
export const updateinfo = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`Please sign up first `, { cause: 400 }));
    }
    const project = await projectGroupModel.findById(id);
    const owner = project.createdby;
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    if (user._id.toString() !== owner.toString()) {
        return res.status(404).json({ message: "You are not able to update project information" });
    } else {
        if (req.body.projectname) {
            project.projectname = req.body.projectname;
        }
        if (req.body.description) {
            project.description = req.body.description;
        }
        if (req.body.task && req.body.email) {
            const useremail = await userModel.findOne({ email: req.body.email });
            if (!useremail) {
                return res.status(404).json({ message: "User not found" });
            }
            for (let i = 0; i < project.members.length; i++) {
                if (project.members[i].userId.toString() === useremail._id.toString()) {
                    project.members[i].task = req.body.task;
                    break;
                }
            }
        }
        await project.save();
        return res.status(200).json({ message: "Success", project });
    }
});

export const adduseringroup = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(req.user._id);
        const useremail = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return next(new Error(`Please sign up first `, { cause: 400 }));
        }
        const project = await projectGroupModel.findById(id);
        const owner = project.createdby;
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (user._id.toString() !== owner.toString()) {
            return res.status(404).json({ message: "You are not able to update project information" });
        }
        else {
            project.members.push({
                userId: useremail._id,
                task: req.body.task, // Add any additional details if needed
            });
            const email = req.body.email;
            await project.save();
            const token = generateToken({email,id}, process.env.SIGNUP_TOKEN, 60 * 5);
            const refreshToken = generateToken({ email, id }, process.env.SIGNUP_TOKEN, 60 * 60 * 24);

            const link = `${req.protocol}://${req.headers.host}/project/confirmEmail/${token}`;
            const Rlink = `${req.protocol}://${req.headers.host}/project/newConfirmEmail/${refreshToken}`;
            const html = `<a href="${link}">Accept invitation</a>  <br/> <br/> <br/> <a href="${Rlink}"> send new email </a> `;

            await sendEmail(email, 'Project Invitation', html);
            return res.status(200).json({ message: "User added to the project" });
        }
    } catch (error) {
        next(error); // Pass any caught errors to the error handling middleware
    }
});
