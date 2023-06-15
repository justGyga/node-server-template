import express from 'express'
import router from './router.js'

const PORT = 3000;

const app = express()

app.use(express.json())
app.use('/api', router)

// app.get("/api/helloworld", function (req, res) {
//     try {
//         res.send("Hello World")
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

async function startApp() {
    try {
        app.listen(PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

startApp()