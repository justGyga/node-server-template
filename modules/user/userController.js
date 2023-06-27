import User from "../models/user.js"
import _ from 'lodash'

import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class UserActionController {

    constructor() {
        autoBind(this)
    }

    // Регистраия
    async registration(req, res) {
        console.log(req.body)
        try {
            const doc = req.body
            if (await User.findOne({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
                return res.status(400).send({ message: `Пользователь с логином ${doc.login} уже существует` })
            }
            await User.create(doc)
            res.status(200).json(_.pick(doc, "name", "secondName"));
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserActionController();