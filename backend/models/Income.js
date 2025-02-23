const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔗 Reference to User
    salary: {
      basic: { type: Number, required: true },
      hra: { type: Number, default: 0 },
      specialAllowance: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 }
    },
    rentalIncome: { type: Number, default: 0 },
    businessIncome: { type: Number, default: 0 },
    otherSources: {
      fdInterest: { type: Number, default: 0 },
      stockGains: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now }
  });
  