import Sequelize from "sequelize";

const sequelize = new Sequelize("users", "postgres", "Santick675485", {
    dialect: "postgres",
    host: "127.0.0.1",
    port: 5432,
    logging: false,
    sync: {alter: true}
})

export default sequelize;