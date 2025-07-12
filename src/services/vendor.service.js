const prisma = require("../lib/prisma.js");

class VendorService {
  async registerVendor(name, ownerId) {
    if (!name) throw new Error("Vendor name is required");
    return await prisma.vendor.create({
      data: { name, ownerId },
    });
  }
}

module.exports = new VendorService(prisma);
