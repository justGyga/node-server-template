import Router from 'express'
import UserActionController from './modules/user/userController.js'
import CommentActionController from './modules/comment/commentController.js'
import { TokenGuard } from './middleware/token-guard.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.status(200).send("Hello World")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/registration', TokenGuard.generate(), UserActionController.registration)
router.post('/comments', TokenGuard.verify(), CommentActionController.addComment)
router.get('/comments', TokenGuard.verify(), CommentActionController.getAllComments)
router.delete('/comments/:id', CommentActionController.deleteComment)

export default router;