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

router.get('/tokenGenerate', TOKEN.generate)

router.get('/tokenVerify', TOKEN.verify)

export default router;