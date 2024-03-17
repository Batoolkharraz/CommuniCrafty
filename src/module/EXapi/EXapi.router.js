import { Router } from "express";
import * as newsCont from './controller/EXapi.controller.js';

import auth, { roles } from "../../MiddleWare/auth.middleware.js";
import { endPoint } from "./news.endPoint.js";
const router = Router();

router.get('/topHeadlines',auth(endPoint.TopHeadlines), newsCont.fetchTopHeadlines);
router.get('/everything', newsCont.fetchEverythingBitcoin);
router.get('/sources',auth(endPoint.Technology), newsCont.fetchSourceTechnology);

export default router;
