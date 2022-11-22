const { Router } = require("express");
const router = Router();
const Container = require("../persistence/container.js");
const containerProducts = new Container();


router.get("/", (req, res) => {
    res.json({ mensaje: "Hola mundo" });
});

module.exports = router;
