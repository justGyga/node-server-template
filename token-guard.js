import jwt from "jsonwebtoken"
import ServerConsts from './config/constants.js';

export class TokenGuard {
    static verify = (req, res, funcs = {}) =>
        async (req, res, next) => {
            try {
                const { authorization } = req.headers
                const token = authorization.split(" ")[1]
                if (!token) {
                    return res.status(403).send({ auth: false, message: 'Токен не предоставлен' });
                }
                jwt.verify(token, ServerConsts.secretkey, (err, decoded) => {
                    if (err) {
                        return res.status(401).send({ auth: false, message: 'Токен невалиден' });
                    }
                });
                next();
            } catch (error) { res.status(401).json({ message: error.message }) }
        }

    static generate = (req, res, funcs = {}) =>
        async (req, res, next) => {
            try {
                const { login, password, firstName, secondName } = req.body
                const userForToken = {
                    name: firstName,
                    secondName: secondName,
                    login: login,
                    password: password
                }
                const token = jwt.sign(userForToken, ServerConsts.secretkey);
                next();
            } catch (error) { res.status(401).json({ message: error.message }) }
        }
}