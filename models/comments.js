import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from "./models/user.js"

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
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        }
    }
}, {
    sequelize, tableName: "comments"
})

Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" })

sequelize.sync({ alter: true });

export default Comment;