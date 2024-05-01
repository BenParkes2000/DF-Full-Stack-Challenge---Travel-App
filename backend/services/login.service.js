import User from "../models/user.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && password === user.password) {
    return user;
  }
  throw new Error(`User not found`);
};
