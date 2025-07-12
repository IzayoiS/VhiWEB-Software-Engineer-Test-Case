const prisma = require("../lib/prisma.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  async register(username, password) {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return {
      id: user.id,
      username: user.username,
      password: hashedPassword,
    };
  }

  async login(username, password) {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}

module.exports = new AuthService();
