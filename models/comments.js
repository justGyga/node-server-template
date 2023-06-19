import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Comment extends Model { }

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

export default Comment;