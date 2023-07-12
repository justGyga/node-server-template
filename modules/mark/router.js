import { Router } from "express";
import { validate, CONTEXT } from "../middleware/validator.js";
import { TokenGuard } from "../middleware/token-guard.js";
import MarkController from "./controller.js";
import {idMarkDto} from "./dto/id-dto.js";
import {putMarkDto} from "./dto/put-dto.js"

const router = new Router();

router.put("/:commentId", TokenGuard.verify, validate(idMarkDto, CONTEXT.PATH), validate(putMarkDto), MarkController.postMark);
router.get("/:commentId", TokenGuard.verify, validate(idMarkDto, CONTEXT.PATH), MarkController.getAllMarks);

export default router;