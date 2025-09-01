import {authMiddleware} from '../middleware/authMiddleware.js';
import { markAsReadController, notificationController, unreadNotificationController } from "../controller/notificationController.js";
import {Router} from 'express'; 

const notificationRoute = Router(); 

notificationRoute.get('/getNotif', authMiddleware, notificationController); 
notificationRoute.get('/getCount', authMiddleware, unreadNotificationController); 
notificationRoute.post('/markRead', authMiddleware, markAsReadController);

export default notificationRoute; 