import User from "../models/User";
import { compare } from "../hash";
import jwtService from "../jwt";


class AuthController {

  register = async (req, res) => {
    try {
      let result = await User.registration(req.body);
      res.status(201).json({ message: "User registered successfully", user: result });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findByUsernameOrEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid username/email or password" });
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username/email or password" });
      }

      const token = jwtService.createToken({ id: user.id, username: user.username, email: user.email });

      res.status(200).json({
        message: "Login successful", data: {
          token,
          user: user,
        },
      });
    } catch (err) {

      res.status(500).json({ message: "Error logging in", error: err.message });
    }
  };

  protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      req.user = jwtService.verify(token);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

const authController = new AuthController();
export default authController;
