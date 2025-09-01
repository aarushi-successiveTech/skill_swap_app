import { updateUserController, deleteUserController, getUserController, getUsersController } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {Router} from 'express'; 


const userRoute = Router(); 

userRoute.put('/updateUser', authMiddleware, updateUserController); 

userRoute.delete('/deleteUser', authMiddleware, deleteUserController); 

userRoute.get('/getUser', authMiddleware, getUserController)

userRoute.get('/getAll', authMiddleware, getUsersController); 

export default userRoute; 