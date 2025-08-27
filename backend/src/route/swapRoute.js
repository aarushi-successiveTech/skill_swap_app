import { creatwSwapController, respondSwapController, getSwapController } from "../controller/swapController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {Router} from 'express'; 

const swapRoute = Router(); 

swapRoute.post('/createSwap', authMiddleware, creatwSwapController); 

swapRoute.post('/respondSwap', authMiddleware, respondSwapController); 

swapRoute.get('/getSwap', authMiddleware, getSwapController); 

export default swapRoute; 