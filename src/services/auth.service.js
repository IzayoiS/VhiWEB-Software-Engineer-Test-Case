class AuthService {
  constructor() {
    this.users = []; // Mock database
  }

  register(username, password) {
    const user = { username, password };
    this.users.push(user);
    return user;
  }

  login(username, password) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    return { token };
  }
}

export default new AuthService();
