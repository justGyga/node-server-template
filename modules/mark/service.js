import Comment from "../models/comments.js";
import Mark from "../models/mark.js";
import _ from 'lodash';
import User from "../models/user.js";

class MarkService {
    async putMark(doc) {
        try{
            const commentExistStatus = await Comment.findByPk(doc.commentId)
            const userExistStatus = await User.findByPk(doc.userId)
        } catch(error) {return false}
        return await Mark.create(_.pick(doc, "like", "commentId", "userId"))
    }
}

export default MarkService;