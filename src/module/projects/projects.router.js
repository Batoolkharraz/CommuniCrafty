import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import * as projectcont from "../../module/projects/controller/projects.contorl.js"
import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPointproject } from './end.js';
import { getproject,confirmEmail } from "./controller/creategroup.js";
import { validation } from "../../MiddleWare/validation.js";
import * as validators from '../auth/auth.validation.js';
// import { validation } from "../../MiddleWare/validation.js";
// import * as validator from "../projects/project.validayion.js"
const projectrouter = Router();
projectrouter.post('/:id',auth(endPointproject.add),fileUpload(fileValidation.image).single('image'),projectcont.createproject);
projectrouter.delete('/delete',auth(endPointproject.delete),projectcont.deleteProjects);
projectrouter.patch('/update/:id',auth(endPointproject.update),fileUpload(fileValidation.image).single('image'),projectcont.updateProject)
projectrouter.get('/get',auth(endPointproject.get),projectcont.getproject);
projectrouter.get('/search',auth(endPointproject.search),projectcont.serach);
projectrouter.get('/Group',auth(endPointproject.create),getproject);
projectrouter.get('/confirmEmail/:token',validation(validators.token),confirmEmail);

export default projectrouter;