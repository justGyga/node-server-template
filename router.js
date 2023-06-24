import Router from 'express'
import UserActionController from './controllers/uac.js'
import CommentActionController from './controllers/cac.js'
import { TokenGuard } from './token-guard.js'

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