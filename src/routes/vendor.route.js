const express = require("express");
const VendorController = require("../controllers/vendor.controller.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

router.post("/", authenticate, VendorController.registerVendor);
router.get("/", authenticate, VendorController.getVendors);
router.put("/:id", authenticate, VendorController.updateVendor);
router.delete("/:id", authenticate, VendorController.deleteVendor);

module.exports = router;
