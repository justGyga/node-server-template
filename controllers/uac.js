import jwt from "jsonwebtoken"
import User from "../models/user.js"

import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class UserActionController{

    constructor(){
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
            await User.create(userForToken)
            const token = jwt.sign(userForToken, secretkey);
            res.status(200).send({ firstName, secondName, token });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserActionController();