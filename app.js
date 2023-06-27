import express from 'express';
import router from './router.js';
import createConnection from './config/database.js';
import modelList from './modules/models/_index.js';
import ServerConsts from './config/constants.js';

const app = express()

app.use(express.json())
app.use('', router)

const modelsInit = async (sequelize) => {
    const keySetter = []
    modelList.forEach(async model => keySetter.push(model(sequelize)));
    keySetter.forEach(exec => exec && exec(sequelize))
    await sequelize.sync({ alter: true })

}

async function startApp() {
    try {
        // const conection = createConnection;
        await modelsInit(createConnection(ServerConsts.DB_NAME, ServerConsts.USER, ServerConsts.PASSWORD))
        app.listen(ServerConsts.PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

await startApp()