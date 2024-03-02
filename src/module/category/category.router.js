import { Router } from "express";
import fileUpload, { fileValidation } from "../../Services/multer_cloud.js";
import * as categoryCont from './controller/category.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./category.validation.js"

import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./category.endPoint.js";

const router = Router();


router.post('/',auth(endPoint.create),validation(validators.createCategory),fileUpload(fileValidation.image).single('image'),categoryCont.createCategory);
router.patch('/update/:categoryId',auth(endPoint.update),validation(validators.updateCategory),fileUpload(fileValidation.image).single('image'),categoryCont.updateCategory)
router.get('/',auth(endPoint.get),categoryCont.getAllCategory);
router.get('/:categoryId',auth(endPoint.get),validation(validators.getCategory),categoryCont.getCategory);
router.delete('/:id',auth(endPoint.delete),categoryCont.deleteCategory);
export default router;