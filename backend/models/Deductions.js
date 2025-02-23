const DeductionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔗 Reference to User
    section80C: { type: Number, default: 0 },
    section80D: { type: Number, default: 0 },
    section80E: { type: Number, default: 0 },
    section24B: { type: Number, default: 0 },
    npsContribution: { type: Number, default: 0 },
    donations80G: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  });
  