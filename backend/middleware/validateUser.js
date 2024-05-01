import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const validateUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (user && passwordMatch) {
    return user;
  }

  throw new Error(`User could not be found`);
};
