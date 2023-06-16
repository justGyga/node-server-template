import jwt from "jsonwebtoken"

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
}

export default new TOKEN();