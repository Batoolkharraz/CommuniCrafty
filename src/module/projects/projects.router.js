import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import * as projectcont from "../../module/projects/controller/projects.contorl.js"
import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPointproject } from './end.js';
import *as creategroup from "./controller/creategroup.js";
import { validation } from "../../MiddleWare/validation.js";
import * as validators from '../auth/auth.validation.js';
// import { validation } from "../../MiddleWare/validation.js";
// import * as validator from "../projects/project.validayion.js"
const projectrouter = Router();
projectrouter.post('/:id',auth(endPointproject.add),fileUpload(fileValidation.image).single('image'),projectcont.createproject);
projectrouter.delete('/delete',auth(endPointproject.delete),projectcont.deleteProjects);
projectrouter.patch('/update/:id',auth(endPointproject.update),fileUpload(fileValidation.image).single('image'),projectcont.updateProject)
projectrouter.get('/get',auth(endPointproject.get),projectcont.getproject);
projectrouter.get('/projectincategory',auth(endPointproject.search),projectcont.projectcategory);
projectrouter.get('/Group',auth(endPointproject.create),creategroup.createGroupProject);
projectrouter.get('/confirmEmail/:token',validation(validators.token),creategroup.confirmEmail);
projectrouter.patch('/taskstatus/:id',auth(endPointproject.update),creategroup.updatestatus);
projectrouter.get('/Groupinfo/:id',auth(endPointproject.get),creategroup.getinformation);
projectrouter.delete('/deletegroup/:id',auth(endPointproject.delete),creategroup.deletegroup);
projectrouter.patch('/updateinfo/:id',auth(endPointproject.update),creategroup.updateinfo);
projectrouter.delete('/deleteusergroup/:id',auth(endPointproject.delete),creategroup.deleteuserfromgroup);
projectrouter.post('/adduser/:id',auth(endPointproject.add),creategroup.adduseringroup);
export default projectrouter;