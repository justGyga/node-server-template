// import _ from 'lodash';
import autoBind from 'auto-bind';
import UserService from './service.js'

class UserController {
    #userService

    constructor() {
        autoBind(this);
        this.#userService = new UserService();
    }

    async registration(req, res) {
        try {
            const result = await this.#userService.createUser(req.body)
            if (result) { return res.status(201).json(result) }
            res.status(409).json({ message: `Пользователь с логином ${req.body.login} уже существует` })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async login(req, res) {
        try {
            const result = await this.#userService.loginUser(req.body)
            if (!result) return res.status(404).json({ message: "Login or password isn't correct" })
            res.status(200).json({ message: "All is correct", token: result })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default new UserController();