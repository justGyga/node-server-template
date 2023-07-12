import { Router } from "express";
import { validate } from "../middleware/validator.js";
import { registerDto } from "./dto/registration-dto.js";
import { loginDto } from "./dto/login-dto.js";
import UserController from "./controller.js";

const router = new Router();

router.post("/registration", validate(registerDto), UserController.registration);
router.post("/login", validate(loginDto), UserController.login);

export default router;