import Router from 'express'
import TOKEN from './controllers/jwt.js'
import UserActionController from './controllers/uac.js'

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
router.post('/addcomment', UserActionController.addComment)
router.get('/comments', UserActionController.getAllComments)
router.delete('/comments/:id', UserActionController.deleteComment)

export default router;