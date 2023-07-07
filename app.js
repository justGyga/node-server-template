import express from 'express';
import router from './router.js';
import createConnection from './config/database.js';
import modelList from './modules/models/_index.js';

const app = express();
const APP_PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || "LeamHomeWorks";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "Santick675485";

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
        await modelsInit(createConnection(DB_NAME, DB_USER, DB_PASSWORD))
        app.listen(APP_PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

await startApp()