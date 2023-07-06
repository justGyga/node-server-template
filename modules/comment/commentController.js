import User from "../models/user.js";
import Comment from "../models/comments.js";
import autoBind from "auto-bind";
import _ from 'lodash';

class CommentActionController {
    constructor() {
        autoBind(this)
    }

    async addComment(req, res) {
        try {
            if (!await User.findByPk(req.user.id)) { 
                return res.status(404).json({ message: `Пользователя с id ${req.user.id} не существует` })
            }
            await Comment.create({text: req.body.text, userId: req.user.id})
            res.status(201).json(_.pick(req.body, 'text'));
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