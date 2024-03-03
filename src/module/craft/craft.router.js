import { Router } from "express"; 
import * as craftCont from './controller/craft.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./craft.validation.js"

import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./craft.endPoint.js";

const router = Router();


 router.post('/:categoryId',auth(endPoint.add),validation(validators.addCraft),craftCont.addCraft);
 router.get('/',auth(endPoint.get),craftCont.getCraft);
 router.delete('/delete/:categoryId',auth(endPoint.delete),validation(validators.deleteCraft),craftCont.deleteCraft);
 router.get('/findBySkill/',auth(endPoint.get),craftCont.findByCraft);
 export default router;