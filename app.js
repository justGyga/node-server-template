import express from 'express'
import router from './router.js'
// import User from './models/user.js';
// import Comment from './models/comments.js';
// import sequelize from './config/database.js';
import createConnection from './config/database.js';
import {userInitter, commentInitter} from './models/_idex.js'
import {DB_NAME, USER, PASSWORD, PORT} from './config/constants.js'

const app = express()

app.use(express.json())
app.use('/api', router)

const modelsInit = async (sequelize) =>{
    const keySetter = []
    modelList.array.forEach(async model => {keySetter.push(model(sequelize))
    keySetter.forEach(exec => exec && exec(sequelize))
    await sequelize.sync({alter:  true})        
    });
}

async function startApp() {
    try {
        const conection = createConnection;
        modelsInit(conection(DB_NAME, USER, PASSWORD))
        sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

startApp()