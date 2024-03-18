import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import * as projectcont from "../../module/projects/controller/projects.contorl.js"
import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPointproject } from './end.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./project.validayion.js"

const projectrouter = Router();
projectrouter.post('/add/:id',fileUpload(fileValidation.image).single('image'),projectcont.createproject);
projectrouter.delete('/delete',auth(endPointproject.delete),validation(validators.deleteProject),projectcont.deleteProjects);
projectrouter.patch('/update/:id',auth(endPointproject.update),validation(validators.updateProject),fileUpload(fileValidation.image).single('image'),projectcont.updateProject)
projectrouter.get('/get',auth(endPointproject.get),projectcont.getproject);
projectrouter.get('/projectincategory',auth(endPointproject.search),projectcont.projectcategory);
export default projectrouter;