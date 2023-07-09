import Sequelize from "sequelize";

const createConnection = (dbName, user, pass) => {
    return new Sequelize(dbName, user, pass, {
        dialect: "postgres",
        host: "127.0.0.1",
        port: 5432,
        logging: false,
        sync: { alter: true }
    });
};

export default createConnection;
