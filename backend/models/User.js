const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date
    // , required: true 
  },
  phoneNumber: { type: String, 
    // required: true, unique: true 
  },
  password: { type: String
    , required: true 
  },
  panNumber: { type: String, 
    // required: true, unique: true, uppercase: true 
  },
  aadharNumber: { type: String,
    //  required: true, unique: true 
    },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
