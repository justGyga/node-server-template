import { Sequelize } from "sequelize";
import DatabaseAdapter from "./core/database/postgresql-adapter.js";
import Server from "./core/server.js";
import Routing from "./core/routes.js";
import modelList from "./modules/models/_index.js";
import helloWorldRouter from "./modules/router.js";
import usersRouter from "./modules/user/router.js";
import commentsRouter from "./modules/comment/router.js";
import marksRouter from "./modules/mark/router.js";

const APP_PORT = process.env.PORT || 3000;
const GLOBAL_PREFIX = process.env.PREFIX || "";

new Server(APP_PORT, [
    new DatabaseAdapter(
        new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            dialect: "postgres",
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || "5432",
            // query 
            logging: false,
            sync: { alter: true }
        })
    ).registerModels([...modelList]),
    new Routing(GLOBAL_PREFIX, [
        { router: helloWorldRouter, prefix: "/helloworld"},
        { router: usersRouter},
        { router: commentsRouter, prefix: "/comments" },
        { router: marksRouter, prefix: "/marks" }
    ])
])
    .initServices()
    .then((server) => server.run(() => console.log(`Server started on port: ${APP_PORT}`)));
