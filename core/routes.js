import { BaseModule } from "./server.js";
import { Router as ExpressRouter } from "express";

export default class Routing extends BaseModule {
    #mainRouter
    #globalPrefix

    constructor(globalPrefix, routers = []) {
        super();
        this.#globalPrefix = globalPrefix;
        this.#mainRouter = ExpressRouter();
        routers.forEach(({ prefix, router }) => this.#mainRouter.use(prefix ?? "", router));
    }

    async handler(app) {
        app.use(this.#globalPrefix, this.#mainRouter);
        console.log("Routes loaded");
    }
}