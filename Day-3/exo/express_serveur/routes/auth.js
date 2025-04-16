import express from "express";
import { register, login } from "../concrollers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export defauld router;
