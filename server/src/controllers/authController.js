import User from "../models/User";
import {compare, makeHash} from "../hash";
import jwtService from "../jwt";


class AuthController {

// Register a new user
    register = async (req, res) => {
        const {
            password,
            email,
            first_name,
        } = req.body;

        try {
            // Check if the user already exists
            let user = await User.findByUsernameOrEmail(email);
            if (user) {
                return res.status(400).json({message: 'Username or email already exists'});
            }

            // Hash the password
            const hashedPassword = await makeHash(password);
            // Create a new user
            user = await User.create({
                username: first_name,
                password: hashedPassword,
                email,
                first_name
            });

            res.status(201).json({message: 'User registered successfully', user});
        } catch (err) {
            res.status(500).json({message: 'Error registering user', error: err.message});
        }
    };

// Log in a user

    login = async (req, res) => {
        const {email, password} = req.body;

        try {
            // Find the user by username or email

            const user = await User.findByUsernameOrEmail(email);
            if (!user) {
                return res.status(400).json({message: 'Invalid username/email or password'});
            }

            // Compare the password
            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({message: 'Invalid username/email or password'});
            }

            const token = jwtService.createToken({username: user.username, email: user.email});
            res.status(200).json({
                message: 'Login successful', data: {
                    token,
                    user: user
                }
            });
        } catch (err) {
            res.status(500).json({message: 'Error logging in', error: err.message});
        }
    };

// Protect routes

    protect = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwtService.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({message: 'Invalid token'});
        }
    };
}

const authController = new AuthController()
export default authController;
