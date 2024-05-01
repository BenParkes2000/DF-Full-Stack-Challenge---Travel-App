import User from "../models/user.model.js";

export const createUserService = async (req, res) => {
  const { name, email, password } = req.body;
  const addedUser = new User({ name: name, email: email, password: password });
  return await addedUser.save();
};
