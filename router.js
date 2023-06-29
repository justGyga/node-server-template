import Router from 'express'
import UserActionController from './modules/user/userController.js'
import CommentActionController from './modules/comment/commentController.js'
import { TokenGuard } from './middleware/token-guard.js'
import { validate, CONTEXT } from './middleware/validator.js'
import { registerDto } from './modules/user/dto/registration-dto.js'
import { loginDto } from './modules/user/dto/login-dto.js'
// import { viewDto } from './modules/comment/dto/view-dto.js'
import { deleteDto } from './modules/comment/dto/delete-dto.js'
import { addDto } from './modules/comment/dto/add-dto.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.status(200).json({ message: "Hello World" })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/registration', validate(registerDto), UserActionController.registration)
router.get('/login', validate(loginDto), UserActionController.login)
router.post('/comments', TokenGuard.verify, validate(addDto), CommentActionController.addComment)
router.get('/comments', TokenGuard.verify, CommentActionController.getAllComments)
router.delete('/comments/:id', validate(deleteDto, CONTEXT.PATH), CommentActionController.deleteComment)

export default router;