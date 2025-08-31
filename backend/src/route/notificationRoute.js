import {authMiddleware} from '../middleware/authMiddleware.js';
import { notificationController } from "../controller/notificationController.js";
import {Router} from 'express'; 

const notificationRoute = Router(); 

notificationRoute.get('/getNotif', authMiddleware, notificationController); 

export default notificationRoute; 