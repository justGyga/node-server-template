import Sequelize from "sequelize";

const createConection = (dbname, user, pass) => {
    return new Sequelize(dbname, user, pass, {
        dialect: "postgres",
        host: "127.0.0.1",
        port: 5432,
        logging: false,
        sync: { alter: true }
    })
}

export default { createConection }