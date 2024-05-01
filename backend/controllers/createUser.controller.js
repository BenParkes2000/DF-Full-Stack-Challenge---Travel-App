import { createUserService } from "../services/createUser.service.js";

export const createUserController = async (req, res) => {
  try {
    const newUser = await createUserService(req);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
