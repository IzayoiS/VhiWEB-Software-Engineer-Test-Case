const authService = require("../services/auth.service");
const userService = require("../services/user.service");

class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Username and password are required",
      });
    }
    try {
      const user = await authService.register(username, password);
      return res.status(201).json({
        status: "success",
        code: 201,
        message: "User registered successfully",
        data: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const { token } = await authService.login(username, password);
      const user = await userService.getUserByUsername(username);

      if (!user) {
        return res.status(404).json({
          status: "error",
          code: 404,
          message: "User not found",
        });
      }

      return res.json({
        status: "success",
        code: 200,
        message: "Login successfully",
        data: {
          id: user.id,
          username: user.username,
          token,
        },
      });
    } catch (error) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
