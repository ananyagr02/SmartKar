const mongoose = require("mongoose");

const DeductionsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  financialYear: { type: String, required: true },

  section80C: { type: Number, default: 0 }, // LIC, PPF, ELSS, EPF, NSC, etc.
  section80D: { type: Number, default: 0 }, // Health Insurance Premium
  section80E: { type: Number, default: 0 }, // Education Loan Interest
  section24B: { type: Number, default: 0 }, // Home Loan Interest
  section10_14: { type: Number, default: 0 }, // HRA exemption
  section87A: { type: Boolean, default: false }, // Rebate eligibility
  otherDeductions: { type: Number, default: 0 },

  section80G: { 
    totalDonation: { type: Number, default: 0 },
    eligibleAmount: { type: Number, default: 0 }, // Auto-calculated based on 50% or 100% eligibility
    donationBreakup: [
      {
        organizationName: { type: String, required: true },
        donationAmount: { type: Number, required: true },
        eligibility: { type: String, enum: ["50%", "100%"], required: true },
        allowedDeduction: { type: Number, required: true } // Auto-calculated (50% or 100% of donationAmount)
      }
    ]
  },

  createdAt: { type: Date, default: Date.now }
});

DeductionsSchema.index({ userId: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model("Deductions", DeductionsSchema);
