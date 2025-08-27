import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const loginService = async(data) => {

    const existingUser = await userModel.findOne({email: data.email}); 
    if(!existingUser){
        return {error: "user not found"}
    }

    const confirmPassword = await bcrypt.compare(data.password, existingUser.password); 
    if(!confirmPassword){
        return {error: "Incorrect Password"}
    }

    const token = jwt.sign({_id: existingUser._id, name: existingUser.name, email: existingUser.email}, secret); 
    return token; 
}