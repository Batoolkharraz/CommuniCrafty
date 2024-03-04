import { Router } from "express";
import * as promotCont from './controller/promot.controller.js';
import { validation } from "../../MiddleWare/validation.js";
import * as validators from "./promot.validation.js"

import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./promot.endPoint.js";

const router = Router();


  router.post('/:toolId',auth(endPoint.add),validation(validators.addPromot),promotCont.addPromot);
  router.patch('/update/:promotId/:toolId',auth(endPoint.update),validation(validators.updatePromot),promotCont.updatePromot)
 router.get('/getUserArtTools/:userId',promotCont.getUserPromot);
 router.get('/getArtTools/:toolId',promotCont.getToolPromot);
  router.get('/:promotId',auth(endPoint.get),promotCont.getPromot);
  router.delete('/:promotId/:toolId',auth(endPoint.delete),promotCont.deletePromot);
export default router;