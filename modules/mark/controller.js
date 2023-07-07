import autoBind from "auto-bind";
import _ from 'lodash';
import MarkService from "./service.js"


class MarkController {
    #markService

    constructor() {
        autoBind(this);
        this.#markService = new MarkService();
    }

    async postMark(req, res) {
        try {
            const doc = {
                userId: req.user.id,
                like: true, // req.body.like,
                commentId: req.params.commentId
            }
            const result = await this.#markService.putMark(doc)
            if (!result) res.status(404).json({message: `Комментария с id ${req.params.commentId} не существует`})
            res.status(201).json(_.pick(result, "like", "commentId"))
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Something went wrong" })
        }
    }
}

export default new MarkController();