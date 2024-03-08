import projectGroupModel from "../../../../DB/model/group.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { generateToken } from "../../../Services/generateAndVerify.js";
import { sendEmail } from "../../../Services/sendEmail.js";

export const getproject=asyncHandler(async(req,res,next)=>{
    const email=req.body.email
  
     const user = await userModel.findById(req.user._id);
    if (!user) {
        return next(new Error(`please sign up first `, { cause: 400 }));
    }
  console.log(req.headers.host)
  const member = await userModel.findOne({ email: email });
  const userid = member._id.toString();
   console.log(userid)
  const newproject=await projectGroupModel.create(
        {
            projectname: req.body.projectname,
            description:req.body.description,
            members:[
                {
                    userId:userid,
                    task:req.body.task,
                }
            ]
        }
  )
  const projid=newproject._id;
 let token =generateToken({email,projid},process.env.SIGNUP_TOKEN,60*5);
 const refreshToken = generateToken({email,projid},process.env.SIGNUP_TOKEN,60*60*24)

const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;

const Rlink =`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;

  const html = `<a href="${link}">Accept invitation</a>  <br/> <br/> <br/> <a href="${Rlink}"> send new email </a> `
  await sendEmail(email,'confirm email',html)
  console.log(projid)
  return res.status(200).json({ message: "Project deleted group created", projid });
})



export const confirmEmail = async(req,res)=>{
    const {token}=req.params;
    const decoded=verifyToken(token,process.env.SIGNUP_TOKEN);
    const projid=decoded.projid;
    const user=await userModel.findOne({email:decoded.email})
    if(!decoded?.email|| !projid){
        return next(new Error("invalid token payload",{cause:409}));
    }
const proj=await projectGroupModel.findById(projid)
if(!proj)
{
    return next(new Error(`No projects added`));
}
let updated = false;
for (const member of proj.members) {
    if (member.userId.toString() === user._id.toString()) {
        await projectGroupModel.updateOne({ userId:user._id, confirm: true });
        updated = true;
                break;
    }
}
if(updated){
    return res.status(200).redirect(`${process.env.URL}`);
}
else{
    return next(new Error("not register account or ur email is verify",{cause:400}))
}
}