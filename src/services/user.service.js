const prisma = require("../lib/prisma.js");

class UserService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getUserByUsername(username) {
    return await this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }
}

module.exports = new UserService(prisma);
