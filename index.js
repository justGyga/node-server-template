import express from 'express'
import router from './router.js'
import User from './models/user.js';
import Comment from './models/comments.js';
import sequelize from './config/database.js';

const PORT = 3000;

const app = express()

app.use(express.json())
app.use('/api', router)


async function startApp() {
    try {
        User.hasMany(Comment, {foreignKey: "userId", onDelete: "CASCADE"})
        Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" })
        sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log("Server is run"))
    } catch (error) {
        console.log(error)
    }
}

startApp()