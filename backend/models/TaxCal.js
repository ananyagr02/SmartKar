const TaxComputationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔗 Reference to User
    totalIncome: { type: Number, required: true },
    totalDeductions: { type: Number, required: true },
    taxableIncome: { type: Number, required: true },
    taxLiability: { type: Number, required: true },
    rebateApplied: { type: Number, default: 0 },
    taxPaid: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  