import express from "express";
import { updateFavouritesController } from "../controllers/updateFavourites.controller.js";

export const router = express.Router();

router.route(`/`).put(updateFavouritesController);
