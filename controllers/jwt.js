import jwt from "jsonwebtoken"
import autoBind from "auto-bind"

const secretkey = "LeamSecretWord"

class TOKEN {
    constructor(){
        autoBind(this)
    }

    // Генерирует токен
    generate(req, res) {
        const payload = {
            username: 'user',
            role: 'admin'
        };
        const token = jwt.sign(payload, secretkey, { expiresIn: '15m' });
        res.send(token);
    }

    // Верифицирует токен
    verify(req, res) {
        const {authorization} = req.headers
        const token = authorization.split(" ")[1]
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
}

export default new TOKEN();