const express = require("express");
const ProductController = require("../controllers/product.controller.js");
const authenticate = require("../middleware/authenticate.js");
const router = express.Router();

router.get("/", authenticate, ProductController.getProducts);
router.post("/", authenticate, ProductController.addProduct);
router.patch("/:id", authenticate, ProductController.updateProduct);
router.delete("/:id", authenticate, ProductController.deleteProduct);

module.exports = router;
