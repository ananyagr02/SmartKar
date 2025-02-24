const mongoose = require("mongoose");

const EmploymentDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  employmentType: { 
    type: String, 
    enum: ["Salaried", "Self-Employed", "Freelancer", "Business Owner", "Other"], 
    required: true 
  },

  employerName: { type: String, required: function() { return this.employmentType === "Salaried"; } },
  employerPAN: { 
    type: String, 
    required: function() { return this.employmentType === "Salaried"; },
    validate: {
      validator: function(pan) {
        return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
      },
      message: "Invalid PAN format"
    }
  },
  
  panType: { type: String }, // Removed default function, will be set in middleware

  employerTAN: { type: String, required: function() { return this.employmentType === "Salaried"; } },

  taxRegime: { type: String, enum: ["Old", "New"], required: true },
  createdAt: { type: Date, default: Date.now }
});

// Middleware to set panType before saving
EmploymentDetailsSchema.pre("save", function(next) {
  if (this.employerPAN) {
    this.panType = getPANType(this.employerPAN);
  }
  next();
});

// Function to determine PAN type
function getPANType(pan) {
  if (!pan || pan.length !== 10) return "Unknown";

  const fourthChar = pan.charAt(3).toUpperCase();
  const panTypes = {
    P: "Individual",
    C: "Company",
    H: "HUF",
    A: "AOP",
    B: "BOI",
    G: "Government Agency",
    J: "Artificial Juridical Person",
    L: "Local Authority",
    T: "Trust",
    F: "Firm"
  };

  return panTypes[fourthChar] || "Unknown Entity";
}

module.exports = mongoose.model("EmploymentDetails", EmploymentDetailsSchema);
