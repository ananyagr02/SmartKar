require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;


  app.use(cors({
    origin: "http://localhost:5173", // Explicitly allow your frontend URL
    credentials: true // Allow cookies/auth headers
  }));
app.use(express.json());

// Connect to MongoDB
connectDB();


// Routes
app.use("/api/auth", authRoutes);

// Middleware
app.use(errorHandler);
// Sample API Route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected!" });
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
