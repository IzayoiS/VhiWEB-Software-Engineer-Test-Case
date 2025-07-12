const express = require("express");
const VendorController = require("../controllers/vendor.controller.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

router.post("/", authenticate, VendorController.registerVendor);

module.exports = router;
