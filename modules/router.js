import Router from "express";
// Middleware
import { validate, CONTEXT } from "./middleware/validator.js";
import { TokenGuard } from "./middleware/token-guard.js";
// Controllers
import UserController from "./user/controller.js";
import CommentController from "./comment/controller.js";
import MarkController from "./mark/controller.js";
// User DTO
import { registerDto } from "./user/dto/registration-dto.js";
import { loginDto } from "./user/dto/login-dto.js";
// Comment DTO
import { deleteDto } from "./comment/dto/delete-dto.js";
import { addDto } from "./comment/dto/add-dto.js";
// Mark DTO
import { putMarkDto } from "./mark/dto/put-dto.js";
import { idMarkDto } from "./mark/dto/id-dto.js";

const router = new Router();
const marks = new Router();

router.use("/marks", marks);

router.get("/helloworld", async function (req, res) {
    try {
        res.status(200).json({ message: "Hello World" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// TODO: GROUP ROUTERS

// Users
router.post("/registration", validate(registerDto), UserController.registration);
router.post("/login", validate(loginDto), UserController.login);

// Comments
router.post("/comments", TokenGuard.verify, validate(addDto), CommentController.addComment);
router.get("/comments", TokenGuard.verify, CommentController.getAllComments);
router.delete("/comments/:id", TokenGuard.verify, validate(deleteDto, CONTEXT.PATH), CommentController.deleteComment);

// Marks
marks.put("/:commentId", TokenGuard.verify, validate(idMarkDto, CONTEXT.PATH), validate(putMarkDto), MarkController.postMark);
marks.get("/:commentId", TokenGuard.verify, validate(idMarkDto, CONTEXT.PATH), MarkController.getAllMarks);

// TODO: EXPORT 3 ROUTERS
export default router;
