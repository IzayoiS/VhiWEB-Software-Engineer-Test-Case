const prisma = require("../lib/prisma.js");

class ProductService {
  async getProducts(ownerId) {
    return await prisma.product.findMany({ where: { ownerId } });
  }

  async addProduct(data) {
    return await prisma.product.create({ data });
  }

  async getById(id) {
    return await prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id, userId, updateData) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        ownerId: parseInt(userId),
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found or you don't have permission");
    }

    return await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name,
        price: parseFloat(updateData.price),
      },
      select: {
        id: true,
        name: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  async deleteProduct(id) {
    return await prisma.product.delete({ where: { id } });
  }
}

module.exports = new ProductService();
