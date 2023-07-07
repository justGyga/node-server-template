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
            const result = await this.#markService.putMark({
                userId: req.user.id,
                like: req.body.like,
                commentId: req.params.commentId
            })
            if (!result) res.status(404).json({ message: `Комментария с id ${req.params.commentId} не существует` })
            res.status(201).json(_.pick(result, "like", "commentId"))
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Something went wrong" })
        }
    }

    async gelAllMarks(req,res){}
}

export default new MarkController();