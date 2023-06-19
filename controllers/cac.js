import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Comment from "../models/comments.js"
import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class CommentActionController {
    constructor() {
        autoBind(this)
    }

    // Верификация токена
    verify(token) {
        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return 401
            }
            return 200
        })
    }

    // Добавление комментария
    async addComment(req, res) {
        try {
            const { text, userId } = req.body
            const user = await User.findByPk(userId)
            if (user === null) { return res.status(500).send({ userId: id, message: "Пользователя с таким id не существует" }) }
            const { authorization } = req.headers
            const token = authorization.split(" ")[1]
            const result = this.verify(token)
            if (result === 401) {
                return res.status(401).send({ auth: false, message: 'Ошибка верификации токена' })
            }
            const commentForToken = {
                text,
                userId
            }
            await Comment.create(commentForToken)
            res.status(200).send({ text, userId });
        } catch (error) { res.status(500).json(error) }
    }

    // Вывести все комментарии
    async getAllComments(req, res) {
        try {
            const { authorization } = req.headers
            const token = authorization.split(" ")[1]
            const result = this.verify(token)
            if (result === 401) {
                return res.status(401).send({ auth: false, message: 'Ошибка верификации токена' })
            }
            const allComments = await Comment.findAll()
            res.status(200).json(allComments);
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // Удаление комментария
    async deleteComment(req, res) {
        try {
            const { id } = req.params
            if (!id) { return res.status(400).send({ message: "id не указан" }) }
            const comment = await Comment.findByPk(id)
            if (comment === null) { return res.status(400).send({ comment: id, message: "Комментария с таким id не существует" }) }
            Comment.destroy({ where: { id: id } })
            res.status(200).json(comment);
        } catch (error) { res.status(500).json(error) }
    }
}

export default new CommentActionController();