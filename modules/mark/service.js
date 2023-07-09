import Comment from "../models/comments.js";
import Mark from "../models/mark.js";
import _ from "lodash";
import User from "../models/user.js";

class MarkService {
    async putMark(userId, mark, commentId) {
        if (!(await Comment.findByPk(commentId))) return false;
        const markExistStatus = await Mark.findOne({ where: { userId, commentId } });
        if (markExistStatus) {
            markExistStatus.like = mark;
            return await markExistStatus.save();
        }
        return await Mark.create({ commentId, userId, like: mark });
    }

    async getMarks(id) {
        const comment = await Comment.findByPk(id, {
            attributes: { exclude: ["userId", "updatedAt"] },
            include: [
                { model: User, attributes: ["id", "login"] },
                { model: Mark, attributes: ["id", "like"], include: { model: User, attributes: ["id", "login"] } }
            ]
        });
        return comment;
    }
}

export default MarkService;
