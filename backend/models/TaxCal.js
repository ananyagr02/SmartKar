const mongoose = require("mongoose");

const TaxCalculationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  financialYear: { type: String, required: true },
  optedOutNewRegime: { type: Boolean, required: true }, // True → Old Regime, False → New Regime

  oldRegime: {
    grossIncome: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    taxableIncome: { type: Number, required: true },
    taxLiability: { type: Number, required: true },
    surcharge: { type: Number, default: 0 },
    educationCess: { type: Number, required: true },
    totalTaxPayable: { type: Number, required: true }
  },

  newRegime: {
    grossIncome: { type: Number, required: true },
    deductions: { type: Number, default: 0 },
    taxableIncome: { type: Number, required: true },
    taxLiability: { type: Number, required: true },
    surcharge: { type: Number, default: 0 },
    educationCess: { type: Number, required: true },
    totalTaxPayable: { type: Number, required: true }
  },

  bestRegime: { type: String, enum: ["Old Regime", "New Regime"], required: true },
  taxSavings: { type: Number, required: true }
}, { timestamps: true });

TaxCalculationSchema.index({ userId: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model("TaxCalculation", TaxCalculationSchema);
