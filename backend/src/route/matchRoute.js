import { matchingController } from "../controller/matchController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {Router} from 'express'; 

const matchRoute = Router(); 

matchRoute.get('/getMatch', authMiddleware, matchingController); 

export default matchRoute; 