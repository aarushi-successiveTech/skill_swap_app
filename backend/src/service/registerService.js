import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'; 

export const registerService = async (data) => {
  try {

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return { error: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new userModel({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      skillOffered: data.skillOffered || [], 
      skillWanted: data.skillWanted || []
    });

    const savedUser = await newUser.save();

    return savedUser;
  } catch (error) {
    console.error("Error in registerService:", error);
    throw new Error("Registration failed");
  }
};