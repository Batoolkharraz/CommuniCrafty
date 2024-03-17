import { Router } from "express";
import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPointproject } from './end.js';
import *as creategroup from "./creategroup.js";
import { validation } from "../../MiddleWare/validation.js";
import * as validators from '../auth/auth.validation.js';
// import { validation } from "../../MiddleWare/validation.js";
// import * as validator from "../projects/project.validayion.js"
const Grouprouter = Router();
Grouprouter.get('/Group',auth(endPointproject.create),creategroup.createGroupProject);
Grouprouter.get('/confirmEmail/:token',validation(validators.token),creategroup.confirmEmail);
Grouprouter.patch('/taskstatus/:id',auth(endPointproject.update),creategroup.updatestatus);
Grouprouter.get('/Groupinfo/:id',auth(endPointproject.get),creategroup.getinformation);
Grouprouter.delete('/deletegroup/:id',auth(endPointproject.delete),creategroup.deletegroup);
Grouprouter.patch('/updateinfo/:id',auth(endPointproject.update),creategroup.updateinfo);
Grouprouter.delete('/deleteusergroup/:id',auth(endPointproject.delete),creategroup.deleteuserfromgroup);
Grouprouter.post('/adduser/:id',auth(endPointproject.add),creategroup.adduseringroup);
export default Grouprouter;