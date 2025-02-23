const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    pan: { type: String, required: true, unique: true },
    aadhaarLinked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  