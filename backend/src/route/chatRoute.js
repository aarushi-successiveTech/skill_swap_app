import {Router} from 'express'; 
const chatRoute = Router(); 

import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendChatController } from '../controller/chatController.js';
import { getChatHistory } from '../controller/chatController.js';

chatRoute.post("/sendChat", authMiddleware, sendChatController); 
chatRoute.get("/chatHistory/:otherUserId", authMiddleware, getChatHistory); 

export default chatRoute; 