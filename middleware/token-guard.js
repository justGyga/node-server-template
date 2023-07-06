import jwt from 'jsonwebtoken'
import ServerConsts from '../config/constants.js';
import _ from 'lodash'

export class TokenGuard {
    static verify = async (req, res, next) => {
        try {
            const { authorization } = req.headers
            const token = authorization.split(" ")[1]
            if (!token) {
                throw new Error();
            }
            const tokenPayload = jwt.verify(token, ServerConsts.secretkey);
            const payload = _.omit(tokenPayload, "iat", "exp")
            req.user = payload
            next();
        } catch (error) { res.status(401).json({ message: 'Токен не действителен' }) }
    }

    static generate = async (payload) => {
        try {
            const expiresIn = process.env.TOKEN_EXPIRE || '7d';
            return jwt.sign(payload, ServerConsts.secretkey, { expiresIn });
        } catch (error) { throw new Error(error.message) }
    }
}