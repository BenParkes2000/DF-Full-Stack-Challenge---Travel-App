import User from "../models/user.model.js";

export const updateFavourites = async (req, res) => {
  const { email, password, favLocations } = req.body;

  const user = await User.findOne({ email: email });

  if (user && password === user.password) {
    user.favLocations = favLocations;
    await user.save();
    return user;
  }
  throw new Error(`User not found`);
};
