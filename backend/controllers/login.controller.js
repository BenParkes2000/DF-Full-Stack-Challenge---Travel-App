import { login } from "../services/login.service.js";

export const loginController = async (req, res) => {
  try {
    const user = await login(req);
    res.status(200).send({ message: `Login successful`, user });
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
