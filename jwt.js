import jwt from "jsonwebtoken"
import User from "./user.js"

const secretkey = "LeamSecretWord"

class TOKEN {
    // Генерируй через Body
    generate(req, res) {
        const payload = {
            username: 'user',
            role: 'admin'
        };
        const token = jwt.sign(payload, secretkey, { expiresIn: '15m' });
        res.send(token);
    }

    // Верифицируй через headers
    verify(req, res) {
        const token = req.headers['authorization'];

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
    // TODO - перенеси регистрауцию в другой файл, соедени ее с бд
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
            console.log(error.message);
        }
    }
}

export default new TOKEN();