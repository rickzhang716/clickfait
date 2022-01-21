module.exports = app => {
    const headlines = require("../controllers/headline.controller.js");

    var router = require("express").Router();

    router.get("/evaluate", headlines.evaluate);

    router.post("/", headlines.create);

    router.get("/", headlines.findAll);

    router.get("/saved", headlines.findAllSaved);

    router.get("/:id", headlines.findOne);

    router.put("/:id", headlines.update);

    router.delete("/:id", headlines.delete);

    router.delete("/", headlines.deleteAll);

    app.use('/api/headlines', router);
}