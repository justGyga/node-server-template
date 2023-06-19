import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Comment from "./models/comments.js"

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize, tableName: "users"
})

User.hasMany(Comment, {foreignKey: "userId", onDelete: "CASCADE"})

sequelize.sync({ alter: true });

export default User;

