const express = require("express");
const multer = require("multer");
const path = require("path");
const axios = require("axios");
const Document = require("../models/Documents");

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 📌 Route to Upload Documents
router.post("/upload", upload.array("documents", 5), async (req, res) => {
  try {
    const { userId, financialYear, docType } = req.body;
    if (!userId || !financialYear || !docType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Store file paths in MongoDB
    const filePaths = req.files.map((file) => file.path);

    let document = await Document.findOne({ userId, financialYear });
    if (!document) {
      document = new Document({ userId, financialYear });
    }

    document[docType] = filePaths;
    await document.save();

    // 🔥 Call Python OCR Service for Text Extraction
    const response = await axios.post("http://localhost:5001/ocr-process", {
      files: filePaths,
      docType,
    });

    res.status(200).json({ message: "Files uploaded & OCR triggered!", data: response.data });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload documents" });
  }
});

module.exports = router;
