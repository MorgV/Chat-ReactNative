import { Router } from "express";
import { loginUser, registryUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registryUser);
router.post("/login", loginUser);

export default router;
