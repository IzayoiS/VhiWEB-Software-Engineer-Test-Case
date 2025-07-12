const express = require("express");
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.get("/", authenticate, getProducts);
router.post("/", authenticate, addProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
