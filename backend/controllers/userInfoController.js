const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Fetch logged-in user details (fullName, email, password)
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from authentication middleware
        const user = await User.findById(userId).select("fullName email password dob phoneNumber panNumber aadharNumber");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update user profile with new fields
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, email, password, dob, phoneNumber, panNumber, aadharNumber } = req.body;

        // Prepare update object
        let updateData = {};

        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (dob) updateData.dob = dob;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (panNumber) updateData.panNumber = panNumber;
        if (aadharNumber) updateData.aadharNumber = aadharNumber;

        // If password is being updated, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getUserProfile, updateUserProfile };
