import Comment from "../models/comments.js";
import Mark from "../models/mark.js";
import _ from 'lodash';
import User from "../models/user.js";

class MarkService {
    async putMark(doc) {
        try {
            const commentExistStatus = await Comment.findByPk(doc.commentId)
            const userExistStatus = await User.findByPk(doc.userId)
            if (!commentExistStatus || !userExistStatus) return false
            return await Mark.create(_.pick(doc, "like", "commentId", "userId"))
        } catch (error) { console.log(error.message) }
        // return await Mark.create({like: doc.like, userId: doc.userId, commentId: doc.commentId})
    }
}

export default MarkService;