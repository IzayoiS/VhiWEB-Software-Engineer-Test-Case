const vendors = [];

class VendorController {
  static registerVendor(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    vendors.push({
      id: vendors.length + 1,
      name,
      owner: req.user.username,
    });

    res.json({ message: "Vendor registered successfully" });
  }

  static getVendors(req, res) {
    const userVendors = vendors.filter((v) => v.owner === req.user.username);
    res.json(userVendors);
  }

  static updateVendor(req, res) {
    const vendor = vendors.find(
      (v) => v.id === parseInt(req.params.id) && v.owner === req.user.username
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const { name } = req.body;
    if (name) vendor.name = name;

    res.json(vendor);
  }

  static deleteVendor(req, res) {
    const index = vendors.findIndex(
      (v) => v.id === parseInt(req.params.id) && v.owner === req.user.username
    );
    if (index === -1)
      return res.status(404).json({ message: "Vendor not found" });

    vendors.splice(index, 1);
    res.json({ message: "Deleted successfully" });
  }
}

module.exports = VendorController;
