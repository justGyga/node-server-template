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
            if (!user) { return res.status(404).json({ message: `Пользователя с id ${doc.userId} не существует` }) }
            await Comment.create(doc)
            res.status(201).json(_.pick(doc, 'text', 'userId'));
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getAllComments(req, res) {
        res.status(200).json(await Comment.findAll());
    }

    async deleteComment(req, res) {
        const doc = req.params
        Comment.destroy({ where: { id: doc.id } })
        res.status(204);
    }
}

export default new CommentActionController();