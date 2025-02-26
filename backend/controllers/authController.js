const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        console.log("📩 Incoming Registration Request:", req.body);

        const { fullName, email, dob, phoneNumber, password, panNumber, aadharNumber } = req.body;

        // Ensure all fields are provided
        if (!fullName || !email || !dob || !phoneNumber || !password || !panNumber || !aadharNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { panNumber }, { aadharNumber }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            fullName,
            email,
            dob,
            phoneNumber,
            password: hashedPassword,
            panNumber,
            aadharNumber,
        });

        await newUser.save();
        console.log("✅ User Registered:", newUser.email);

        // Generate JWT
        const token = generateToken(newUser);

        // Send response
        res.status(201).json({ token, user: { id: newUser._id, fullName, email, dob, phoneNumber, panNumber, aadharNumber } });

    } catch (error) {
        console.error("❌ Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        console.log("🔑 Incoming Login Request:", req.body);

        const { email, password } = req.body;

        // Ensure both fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = generateToken(user);

        // Send response
        res.status(200).json({ token, user: { id: user._id, email } });

    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
