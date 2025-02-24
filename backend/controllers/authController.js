// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // REGISTER USER
// const registerUser = async (req, res) => {
//     try {
//         const { fullName, email, phoneNumber, dob, password, panNumber, aadharNumber } = req.body;

//         // Check if user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "User already exists" });

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new User({
//             fullName, email, phoneNumber, dob, password: hashedPassword, panNumber, aadharNumber
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         res.status(200).json({ message: "Login successful", user });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// module.exports = { registerUser, loginUser };

// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // REGISTER USER
// const registerUser = async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;

//         // Ensure all fields are provided
//         if (!fullName || !email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new User({
//             fullName,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });

//     } catch (error) {
//         console.error("Error in registerUser:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Ensure both fields are provided
//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         res.status(200).json({ message: "Login successful", user });

//     } catch (error) {
//         console.error("Error in loginUser:", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// module.exports = { registerUser, loginUser };




const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Ensure all fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required: fullName, email, password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" }); // 409 Conflict
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Error in registerUser:", error);

        // Handle Mongoose validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation error",
                error: error.message,
                fields: error.errors, // Provides specific field errors
            });
        }

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }

        res.status(500).json({ 
            message: "Server error", 
            error: error.message, 
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure both fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" }); // 401 Unauthorized
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.error("❌ Error in loginUser:", error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message, 
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        });
    }
};

module.exports = { registerUser, loginUser };
