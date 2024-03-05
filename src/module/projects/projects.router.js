import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import { validation } from "../../MiddleWare/validation.js";
import * as projectcont from "../../module/projects/controller/projects.contorl.js"
import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPointproject } from './end.js';
const projectrouter = Router();

projectrouter.post('/:id',auth(endPointproject.add),projectcont.createproject);
export default projectrouter;