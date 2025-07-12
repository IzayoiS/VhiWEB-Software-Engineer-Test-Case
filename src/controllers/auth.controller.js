const jwt = require("jsonwebtoken");
const users = [];

class AuthController {
  static register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = { username, password };
    users.push(user);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  }

  static login(req, res) {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Login successful", token });
  }
}

module.exports = AuthController;
