import { DataTypes, Model } from 'sequelize';
import Comment from '../comment/comments.js';

export default class User extends Model { }

export const userInitter = (sequelize) => {
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

    return () => { User.hasMany(Comment, { foreignKey: "userId", onDelete: "CASCADE" }) }
}