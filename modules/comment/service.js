import User from '../models/user.js';
import Comment from "../models/comments.js";

class CommentService{
    async postComment(doc){
        if (!await User.findByPk(doc.id)) { 
            return false
        }
        return await Comment.create({text: doc.text, userId: doc.id}) // return with id (entity)
        return {text: doc.text}
    }

    async getAllComments(){
        return await Comment.findAll()
    }

    async destroyComment(id){
        Comment.destroy({ where: { id: id } })
    }
}

export default CommentService;