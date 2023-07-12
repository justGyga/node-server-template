import Router from "express";

const router = new Router();

router.get("", function (req, res) {
    res.status(200).json({ message: "Hello World" });
});

export default router;
