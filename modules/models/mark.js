import { DataTypes, Model } from "sequelize";
import User from "./user.js";
import Comment from "./comments.js";

export default class Mark extends Model {}

export const markInitter = (sequelize) => {
    Mark.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            like: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        { sequelize, tableName: "marks" }
    );

    return () => {
        Mark.belongsTo(Comment, { foreignKey: "commentId", onDelete: "CASCADE" });
        Mark.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
    };
};
