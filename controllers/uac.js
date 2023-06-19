import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Comment from "../models/comments.js"
import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class UserActionController{

    constructor(){
        autoBind(this)
    }

    // Реши эту проблему
    tokenVerify(token) {
        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                console.log(err)
                return 500
                // return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            return 200
        })
    }

    // Регистраия
    async registration(req, res) {
        try {
            const { login, password, firstName, secondName } = req.body
            const userForToken = {
                name: firstName,
                secondName: secondName,
                login: login,
                password: password
            }
            await User.create(userForToken)
            const token = jwt.sign(userForToken, secretkey);
            res.status(200).send({ firstName, secondName, token });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async addComment(req, res) {
        try {
            const { text, userId } = req.body
            const user = await User.findByPk(userId)
            if (user === null) { return res.status(500).send({ userId: id, message: "Пользователя с таким id не существует" })}
            const { authorization } = req.headers
            const token = authorization.split(" ")[1]
            jwt.verify(token, secretkey, (err, decoded) => {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }
            })
            const commentForToken = {
                text,
                userId
            }
            await Comment.create(commentForToken)
            res.status(200).send({ text, userId });
        } catch (error) { res.status(500).json(error) }
    }

    async getAllComments(req, res) {
        try {
            const { authorization } = req.headers
            const token = authorization.split(" ")[1]
            // jwt.verify(token, secretkey, (err, decoded) => {
            //     if (err) {
            //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            //     }
            // })
            const result = this.tokenVerify(token)
            if (result === 500){
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
            }
            const allComments = await Comment.findAll()
            res.status(200).json(allComments);
        } catch (error) {
            console.log(error) 
            res.status(500).json(error) }
    }

    async deleteComment(req, res) {
        try {
            const { id } = req.params
            if (!id) { return res.status(400).send({ message: "id не указан" }) }
            const comment = await Comment.findByPk(id)
            if (comment === null) { return res.status(500).send({ comment: id, message: "Комментария с таким id не существует" }) }
            Comment.destroy({ where: { id: id } })
            res.status(200).json(comment);

        } catch (error) { res.status(500).json(error) }
    }
}

export default new UserActionController();