import User from "../models/user.js";
import Comment from "../models/comments.js";
import autoBind from "auto-bind";
import _ from 'lodash';

class CommentActionController {
    constructor() {
        autoBind(this)
    }

    async addComment(req, res) {
        const doc = req.body
        try {
            const user = await User.findByPk(doc.userId)
            if (!user) { return res.status(400).json({ message: `Пользователя с id ${doc.userId} не существует` }) }
            await Comment.create(doc)
            res.status(200).json(_.pick(doc, 'text', 'userId'));
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getAllComments(req, res) {
        try {
            res.status(200).json(await Comment.findAll());
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async deleteComment(req, res) {
        const doc = req.params
        try {
            if (!doc.id) { return res.status(400).json({ message: "id не указан" }) }
            const comment = await Comment.findByPk(doc.id)
            comment.destroy()
            res.status(200).json({ message: `Комментария с id ${doc.id} был удален` });
        } catch (error) {
            res.status(400).json({ message: `Комментария с id ${doc.id} не существует` })
        }
    }
}

export default new CommentActionController();