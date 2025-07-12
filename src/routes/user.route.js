const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.get("/:username", UserController.getByusername);

module.exports = router;
