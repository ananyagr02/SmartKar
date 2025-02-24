const mongoose = require("mongoose");

const TaxFilingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  financialYear: { type: String, required: true },

  filingStatus: { 
    type: String, 
    enum: ["Pending", "Filed", "Rejected"], 
    default: "Pending" 
  },

  filingMode: { 
    type: String, 
    enum: ["Manual", "E-Filing"], 
    required: true 
  },

  acknowledgmentNumber: { type: String, unique: true, sparse: true }, // Only for successful filings
  filingDate: { type: Date },
  itrFormType: { type: String, required: true }, // e.g., "ITR-1", "ITR-2", etc.

  taxPaid: { type: Number, required: true },
  refundExpected: { type: Number, default: 0 },
  additionalTaxLiability: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

TaxFilingSchema.index({ userId: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model("TaxFiling", TaxFilingSchema);
