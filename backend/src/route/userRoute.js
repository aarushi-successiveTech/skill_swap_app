import { updateUserController, deleteUserController, getUserController } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {Router} from 'express'; 


const userRoute = Router(); 

userRoute.put('/updateUser', authMiddleware, updateUserController); 

userRoute.delete('/deleteUser', authMiddleware, deleteUserController); 

userRoute.get('/getUser', authMiddleware, getUserController)

export default userRoute; 