const vendorService = require("../services/vendor.service");

class VendorController {
  static async registerVendor(req, res) {
    const { name } = req.body;
    const userId = req.user.id;
    try {
      const vendor = await vendorService.registerVendor(name, userId);
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Vendor registered successfully",
        vendor,
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

module.exports = VendorController;
