import autoBind from "auto-bind";
import _ from "lodash";
import CommentService from "./service.js";

class CommentController {
    #commentService;

    constructor() {
        autoBind(this);
        this.#commentService = new CommentService();
    }

    async addComment(req, res) {
        try {
            const result = await this.#commentService.postComment({ text: req.body.text, id: req.user.id });
            if (!result) {
                return res.status(404).json({ message: `Пользователя с id ${req.user.id} не существует` });
            }
            res.status(201).json(_.pick(result, "text", "userId"));
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getAllComments(req, res) {
        res.status(200).json(await this.#commentService.getAllComments());
    }

    async deleteComment(req, res) {
        await this.#commentService.destroyComment(req.params.id);
        res.status(204).send();
    }
}

export default new CommentController();
