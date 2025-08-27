import { registerService } from "../service/registerService.js";

export const registerController = async (req, res) => {
  try {
    const user = await registerService(req.body);

    // if (user?.error) {
    //   return res.status(400).json({ message: user.error });
    // }

    return res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration unsuccessful",
      error: error.message
    });
  }
};