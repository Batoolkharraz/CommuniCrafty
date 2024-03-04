import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import * as toolCont from './controller/tool.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./tool.validation.js"

import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./tool.endPoint.js";

const router = Router();


 router.post('/:categoryId',auth(endPoint.add),validation(validators.addTool),fileUpload(fileValidation.image).single('image'),toolCont.addTool);
 router.patch('/update/:toolId',auth(endPoint.update),validation(validators.updateTool),fileUpload(fileValidation.image).single('image'),toolCont.updateTool)
 router.get('/',auth(endPoint.get),toolCont.getAllTools);
 router.get('/:toolId',auth(endPoint.get),toolCont.getTool);
 router.delete('/:toolId',auth(endPoint.delete),toolCont.deleteTool);
export default router;