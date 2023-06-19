import express from 'express'
import router from './router.js'
import User from './models/user.js';
import Comment from './models/comments.js';

const PORT = 3000;

const app = express()

app.use(express.json())
app.use('/api', router)

const modelStack = (arg) => {
    
}

async function startApp() {
    try {
        modelStack([User, Comment])
        app.listen(PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

startApp()