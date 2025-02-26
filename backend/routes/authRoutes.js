const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/authMiddleware"); // Import auth middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (Commented out for now, enable later)
// router.get("/protected-route", verifyToken, (req, res) => {
//     res.json({ message: "This is a protected route", user: req.user });
// });

module.exports = router;
