const productService = require("../services/product.service");

class ProductController {
  static async getProducts(req, res) {
    const userId = req.user.id;
    try {
      const products = await productService.getProducts(userId);
      res.json({
        status: "success",
        code: 200,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        code: 500,
        message: error.message,
      });
    }
  }

  static async addProduct(req, res) {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Name and price are required",
      });
    }

    const userId = req.user.id;
    try {
      const product = await productService.addProduct({
        name,
        price,
        ownerId: userId,
      });
      res.status(201).json({
        status: "success",
        code: 201,
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Name and price are required",
      });
    }
    const userId = req.user.id;
    try {
      const product = await productService.updateProduct(parseInt(id), userId, {
        name,
        price,
      });
      res.json({
        status: "success",
        code: 200,
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      await productService.deleteProduct(parseInt(id), userId);
      res.json({
        status: "success",
        code: 200,
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      });
    }
  }
}

module.exports = ProductController;
