import { Router } from "express";
import { validate, CONTEXT } from "../middleware/validator.js";
import CommentController from "./controller.js";
import { deleteDto } from "./dto/delete-dto.js";
import { addDto } from "./dto/add-dto.js";
import { TokenGuard } from "../middleware/token-guard.js";

const router = new Router();

router.post("", TokenGuard.verify, validate(addDto), CommentController.addComment);
router.get("", TokenGuard.verify, CommentController.getAllComments);
router.delete("/:id", TokenGuard.verify, validate(deleteDto, CONTEXT.PATH), CommentController.deleteComment);

export default router;
