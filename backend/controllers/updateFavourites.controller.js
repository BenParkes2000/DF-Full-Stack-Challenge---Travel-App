import { updateFavourites } from "../services/updateFavourites.service.js";

export const updateFavouritesController = async (req, res) => {
  try {
    const user = await updateFavourites(req);
    res.status(200).send({ message: `Update successful`, user });
  } catch (error) {
    res.status(400).send({ message: `${error}` });
  }
};
