import Comment from "../models/comments.js";
import Mark from "../models/mark.js";
import _ from "lodash";
import User from "../models/user.js";

class MarkService {
    async putMark(doc) {
        // take 3 vars
        try {
            const commentExistStatus = await Comment.findByPk(doc.commentId); // use if Comment.count({id: ...}) except findByPk
        } catch (error) {
            return false;
        }
        const markExistStatus = await Mark.findOne({ where: { userId: doc.userId, commentId: doc.commentId } });
        if (markExistStatus) {
            markExistStatus.like = doc.like;
            return await markExistStatus.save();
        }
        return await Mark.create(_.pick(doc, "like", "commentId", "userId"));
    }

    async getMarks(doc) {
        // take id except doc
        const comment = await Comment.findByPk(doc.commentId, {
            attributes: { exclude: ["userId", "updatedAt"] },
            include: [
                { model: User, attributes: ["id", "login"] },
                { model: Mark, attributes: ["id", "like"], include: { model: User, attributes: ["id", "login"] } }
            ]
        });
        // comment.Marks = comment.Marks.map((mark) => {
        //     mark.User = mark.User.login
        //     return _.pick(mark, "like", "User")
        // })
        return comment;
    }
}

export default MarkService;
