import Router from 'express'
import UserActionController from './modules/user/userController.js'
import CommentActionController from './modules/comment/commentController.js'
import { TokenGuard } from './middleware/token-guard.js'
import { validate } from './middleware/validator.js'
import { registerDto } from './modules/user/dto/registration-dto.js'
import { loginDto } from './modules/user/dto/login-dto.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.status(200).send("Hello World")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/registration', validate(registerDto), UserActionController.registration)
router.get('/login', validate(loginDto), UserActionController.login)
router.post('/comments', TokenGuard.verify, CommentActionController.addComment)
router.get('/comments', TokenGuard.verify, CommentActionController.getAllComments)
router.delete('/comments/:id', CommentActionController.deleteComment)

export default router;