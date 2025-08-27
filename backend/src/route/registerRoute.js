import { registerController } from "../controller/registerController.js";
import {Router} from 'express'; 

const registerRouter = Router(); 
registerRouter.post('/register', registerController); 

export default registerRouter;