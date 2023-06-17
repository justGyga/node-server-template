import Router from 'express'
import TOKEN from './jwt.js'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.send("Hello World")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/token/generate', TOKEN.generate)
router.get('/token/verify', TOKEN.verify)
router.get('/registration', TOKEN.registration)

export default router;