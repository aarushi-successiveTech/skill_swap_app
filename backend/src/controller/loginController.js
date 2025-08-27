import { loginService } from "../service/loginService.js";

export const loginController = async(req, res) => {

    try{
        const token = await loginService(req.body); 

        if(token.error){
            return res.status(400).json({message: token.error});
        }

        return res.status(201).json({
            message: "user login successful", 
            token
        }); 
    }
    catch(error){
        return res.status(400).json({
            message:"login unsuccessful", 
            error
        }); 
    }
}