const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  financialYear: { type: String, required: true },

  salaryIncome: {
    grossSalary: { type: Number, required: true }, 
    standardDeduction: { type: Number, default: 50000 }, // Auto-applied
    taxableSalary: { type: Number, required: true } // After deductions
  },

  businessIncome: { type: Number, default: 0 }, 

  capitalGains: {
    shortTermGains: { type: Number, default: 0 }, 
    longTermGains: { type: Number, default: 0 }, 
    totalGains: { type: Number, default: 0 } // Sum of STCG + LTCG
  },

  rentalIncome: {
    grossRent: { type: Number, default: 0 },
    municipalTaxesPaid: { type: Number, default: 0 },
    standardDeduction: { type: Number, default: 0 }, // 30% deduction for rental income
    netRentalIncome: { type: Number, default: 0 } // Auto-calculated
  },

  interestIncome: {
    savingsInterest: { type: Number, default: 0 }, 
    fixedDepositInterest: { type: Number, default: 0 },
    otherInterest: { type: Number, default: 0 },
    totalInterest: { type: Number, default: 0 } // Sum of all interest sources
  },

  dividends: {
    stockDividends: { type: Number, default: 0 }, 
    mutualFundDividends: { type: Number, default: 0 },
    totalDividends: { type: Number, default: 0 } // Sum of stock + mutual fund dividends
  },

  otherIncome: { type: Number, default: 0 }, // Any uncategorized income sources

  totalIncome: { type: Number, required: true }, // Sum of all above income sources

  createdAt: { type: Date, default: Date.now }
});

IncomeSchema.index({ userId: 1, financialYear: 1 }, { unique: true });

module.exports = mongoose.model("Income", IncomeSchema);
