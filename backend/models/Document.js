const DocumentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔗 Reference to User
    documentType: { type: String, enum: ["Form 16", "Salary Slip", "26AS"], required: true },
    documentUrl: { type: String, required: true }, // Cloud storage link
    uploadedAt: { type: Date, default: Date.now }
  });
  