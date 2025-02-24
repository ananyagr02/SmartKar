const mongoose = require("mongoose");

const DocumentsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  financialYear: { type: String, required: true },
  form16: { type: String, required: true }, // File path or URL
  form26AS: { type: String, required: true },
  salarySlips: [{ type: String }],
  investmentProofs: [{ type: String }],
  loanDocuments: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

DocumentsSchema.index({ userId: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model("Documents", DocumentsSchema);
