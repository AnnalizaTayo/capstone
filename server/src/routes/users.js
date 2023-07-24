// routes/users.js
import express from 'express';
import jsonWebToken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
    // Check if the username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new UserModel({
        username,
        password: hashedPassword,
        role,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await UserModel.findOne({ username }).maxTimeMS(20000); // Set timeout to 20 seconds

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: 'User Does not exist!' });
        }

        // Compare the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Wrong password.' });
        }

        // Generate a JWT token
        const token = jsonWebToken.sign({ id: user._id }, process.env.USER_TOKEN_SECRET_KEY);

        // Send the token as a response
        res.json({ token, userID: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server busy' });
    }
});
  

export { router as userRouter };
