import User from "../models/user.js";
import _ from 'lodash';
import { Op } from 'sequelize';
import autoBind from "auto-bind";
import { TokenGuard } from "../../middleware/token-guard.js";

class UserActionController {

    constructor() {
        autoBind(this)
    }

    // Регистраия
    async registration(req, res) {
        try {
            const doc = req.body
            if (await User.findOne({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
                return res.status(400).json({ message: `Пользователь с логином ${doc.login} уже существует` })
            }
            await User.create(doc)
            res.status(200).json(_.pick(doc, "name", "secondName"));
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async login(req, res) {
        try {
            const doc = req.body
            const signedUser = await User.findOne({ where: { login: { [Op.iLike]: doc.login }, password: { [Op.iLike]: doc.password } }, raw: true })
            if (!signedUser) {
                return res.status(400).json({ message: "Login or password isn't correct" })
            }
            res.status(200).json({ message: "All is correct", token: await TokenGuard.generate(signedUser.id) })
        } catch (error) { res.status(500).json(error.message) }

    }
}

export default new UserActionController();