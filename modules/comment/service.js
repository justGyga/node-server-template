import User from "../models/user.js";
import Comment from "../models/comments.js";

class CommentService {
    async postComment(doc) {
        return await Comment.create({ text: doc.text, userId: doc.id });
    }

    async getAllComments() {
        return await Comment.findAll(); // TODO: include User
    }

    async destroyComment(id) {
        Comment.destroy({ where: { id: id } });
    }
}

export default CommentService;
