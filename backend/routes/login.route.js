import express from "express";
import { loginController } from "../controllers/login.controller.js";

export const router = express.Router();

router.route(`/`).post(loginController);
