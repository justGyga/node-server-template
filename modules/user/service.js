import User from '../models/user.js';
import argon2 from 'argon2';
import _ from 'lodash';
import { TokenGuard } from '../../middleware/token-guard.js';
import { Op } from 'sequelize';

class UserService {
    async createUser(doc) {
        if (await User.findOne({ where: { login: { [Op.iLike]: doc.login } }, raw: true })) {
            return false
        }
        doc.password = await argon2.hash(doc.password);
        await User.create(doc)
        return _.pick(doc, "name", "secondName")
    }

    async loginUser(doc) {
        const userFindStatus = await User.findOne({
            where: {
                login: { [Op.iLike]: doc.login }
            }, raw: true
        })
        if (!userFindStatus || !await argon2.verify(userFindStatus.password, doc.password)) return false
        return await TokenGuard.generate({ id: userFindStatus.id })
    }
}

export default UserService;