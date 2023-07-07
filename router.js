import Router from 'express'
// Middleware
import { validate, CONTEXT } from './middleware/validator.js'
import { TokenGuard } from './middleware/token-guard.js'
// Controllers
import UserController from './modules/user/controller.js'
import CommentController from './modules/comment/controller.js'
import MarkController from './modules/mark/controller.js'
// User DTO
import { registerDto } from './modules/user/dto/registration-dto.js'
import { loginDto } from './modules/user/dto/login-dto.js'
// Comment DTO
import { deleteDto } from './modules/comment/dto/delete-dto.js'
import { addDto } from './modules/comment/dto/add-dto.js'
// Mark DTO
import { putMarkDto } from './modules/mark/dto/add-dto.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.status(200).json({ message: "Hello World" })
    } catch (error) {
        res.status(500).json(error)
    }
})

// Users
router.post('/registration', validate(registerDto), UserController.registration)
router.post('/login', validate(loginDto), UserController.login)

// Comments
router.post('/comments', TokenGuard.verify, validate(addDto), CommentController.addComment)
router.get('/comments', TokenGuard.verify, CommentController.getAllComments)
router.delete('/comments/:id', validate(deleteDto, CONTEXT.PATH), CommentController.deleteComment)

// Marks
router.put('/comments/:commentId', TokenGuard.verify, validate(putMarkDto, CONTEXT.PATH), MarkController.postMark)

export default router;