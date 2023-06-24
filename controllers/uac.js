import jwt from "jsonwebtoken"
import User from "../models/user.js"

import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class UserActionController {

    constructor() {
        autoBind(this)
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
            if (await User.findOne({ where: { login: userForToken.login }, raw: true })){
                return res.status(400).send({ message: `Пользователь с логином ${userForToken.login} уже существует` })
            }
            await User.create(userForToken)
            res.status(200).send({ firstName, secondName});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserActionController();