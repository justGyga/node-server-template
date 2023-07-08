import Comment from "../models/comments.js";
import Mark from "../models/mark.js";
import _ from 'lodash';
import User from "../models/user.js";

class MarkService {
    async putMark(doc) {
        try {
            const commentExistStatus = await Comment.findByPk(doc.commentId)
            const userExistStatus = await User.findByPk(doc.userId)
        } catch (error) { return false }
        const markExistStatus = await Mark.findOne({ where: { userId: doc.userId, commentId: doc.commentId } })
        if (markExistStatus) {
            markExistStatus.like = doc.like
            return await markExistStatus.save()
        }
        return await Mark.create(_.pick(doc, "like", "commentId", "userId"))
    }

    async getMarks(doc) {
        const comment = await Comment.findByPk(doc.commentId, { include: [{ model: Mark, include: User }] })
        comment.Marks = comment.Marks.map((mark) => {
            mark.User = mark.User.login
            return _.pick(mark, "like", "User")
        })
        return comment
    }
}

export default MarkService;