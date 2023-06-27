import { DataTypes, Model } from 'sequelize';
import User from './user.js';

export default class Comment extends Model { }

export const commentInitter = (sequelize) => {
    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize, tableName: "comments"
    })

    return () => { Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" }) }
}
