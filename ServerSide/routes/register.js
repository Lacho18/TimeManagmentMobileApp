const express = require("express");
const router = express.Router();
const { registerController } = require('../controller/registerController');

router.post("/", (req, res) => {
    console.log("Hello");
    registerController(req, res);
});

module.exports = router;