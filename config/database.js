import Sequelize from "sequelize";

const sequelize = new Sequelize(DB_NAME, PG_USER, PG_PASS, {
    dialect: "postgres",
    host: "127.0.0.1",
    port: 5432,
    logging: false
})

export default sequelize;