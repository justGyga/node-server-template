import autoBind from "auto-bind";
import _ from "lodash";
import MarkService from "./service.js";

class MarkController {
    #markService;

    constructor() {
        autoBind(this);
        this.#markService = new MarkService();
    }

    async postMark(req, res) {
        try {
            const result = await this.#markService.putMark(req.user.id, req.body.like, req.params.commentId);
            if (!result) return res.status(404).json({ message: `Комментария с id ${req.params.commentId} не существует` });
            res.status(201).json(_.pick(result, "like", "commentId"));
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getAllMarks(req, res) {
        try {
            const result = await this.#markService.getMarks(req.params.commentId);
            res.status(200).json(result);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default new MarkController();
