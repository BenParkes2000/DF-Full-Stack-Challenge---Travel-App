import express from "express";
import { createUserController } from "../controllers/createUser.controller.js";

export const router = express.Router();

router.route(`/`).post(createUserController);
