import Router from 'express'

const router = new Router()

router.get('/helloworld', async function (req, res) {
    try {
        res.send("Hello World")
    } catch (error) {
        res.status(500).json(error)
    }
})


export default router;