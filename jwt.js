import jwt from "jsonwebtoken"
import User from "./models/user.js"
import Comment from "./models/comments.js"

const secretkey = "LeamSecretWord"

class TOKEN {
    // Генерируй
    generate(req, res) {
        const payload = {
            username: 'user',
            role: 'admin'
        };
        const token = jwt.sign(payload, secretkey, { expiresIn: '15m' });
        res.send(token);
    }

    // Верифицируй
    verify(req, res) {
        const {token} = req.body;

        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            res.status(200).send({ auth: true, message: 'Token is valid.' });
        });
    }

    // Регистраия
    // TODO - перенеси регистрауцию в другой файл
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

    async addcomment(req, res){
        try{
            const {text, userId, token} = req.body
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
            res.status(200).send({ text, userId});
        } catch (error){res.status(500).json(error)}
    }
}

export default new TOKEN();