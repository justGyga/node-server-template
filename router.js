import Router from 'express'
import TOKEN from './controllers/jwt.js'
import UserActionController from './controllers/uac.js'
import CommentActionController from './controllers/cac.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.status(200).send("Hello World")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/token/generate', TOKEN.generate)
router.get('/token/verify', TOKEN.verify)
router.post('/registration', UserActionController.registration)
router.post('/comments', CommentActionController.addComment)
router.get('/comments', CommentActionController.getAllComments)
router.delete('/comments/:id', CommentActionController.deleteComment)

export default router;