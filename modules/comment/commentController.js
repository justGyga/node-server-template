import User from "../models/user.js";
import Comment from "../models/comments.js";
import autoBind from "auto-bind";

class CommentActionController {
    constructor() {
        autoBind(this)
    }

    // Добавление комментария
    async addComment(req, res) {
        try {
            const doc = req.body
            const user = await User.findByPk(doc.userId)
            if (!user) { return res.status(400).json({ message: `Пользователя с id ${doc.userId} не существует` }) }
            await Comment.create(doc)
            res.status(200).json({ text: doc.text, userLogin: user.login });
        } catch (error) { res.status(500).json(error.message) }
    }

    // Вывести все комментарии
    async getAllComments(req, res) {
        try {
            const allComments = await Comment.findAll()
            res.status(200).json(allComments);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // Удаление комментария
    async deleteComment(req, res) {
        try {
            const doc = req.params
            if (!doc.id) { return res.status(400).json({ message: "id не указан" }) }
            const comment = await Comment.findByPk(doc.id)
            comment.destroy()
            res.status(200).json(doc.id);
        } catch (error) { res.status(500).json({ message: `Комментария с id ${doc.id} не существует` }) }
    }
}

export default new CommentActionController();