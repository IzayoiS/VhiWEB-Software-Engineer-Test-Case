const userService = require("../services/user.service");

class UserController {
  static async getByusername(req, res) {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Username is required",
      });
    }

    try {
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
        data: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", code: 500, message: error.message });
    }
  }
}

module.exports = UserController;
