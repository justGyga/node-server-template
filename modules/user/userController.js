import User from "../models/user.js";
import _ from 'lodash';
import { Op } from 'sequelize';
import autoBind from "auto-bind";
import { TokenGuard } from "../../middleware/token-guard.js";
import * as argon2 from "argon2";

class UserActionController {

    constructor() {
        autoBind(this)
    }

    async registration(req, res) {
        const doc = req.body
        try {
            if (await User.findOne({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
                return res.status(409).json({ message: `Пользователь с логином ${doc.login} уже существует` })
            }
            doc.password = await argon2.hash(doc.password);
            await User.create(doc)
            res.status(201).json(_.pick(doc, "name", "secondName"));
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async login(req, res) {
        const doc = req.body
        doc.password = await argon2.hash(doc.password);
        try {
            const signedUser = await User.findOne({
                where: {
                    login: { [Op.iLike]: doc.login },
                    password: doc.password
                }, raw: true
            })
            if (!signedUser) {
                return res.status(404).json({ message: "Login or password isn't correct" })
            }
            res.status(200).json({ message: "All is correct", token: await TokenGuard.generate({id: signedUser.id}) })
        } catch (error) { res.status(500).json(error.message) }

    }
}

export default new UserActionController();