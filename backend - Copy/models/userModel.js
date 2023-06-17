const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "Provide email"],
    unique: [true, "this email is already exists"],
    lowercase: true,
    validate: [validator.isEmail, " Provide valid email"],
  },
  
  password: {
    type: String,
    required: [true, "Provide password"],
    minlength: 8,
    select: false,
  },
  
  passwordResetToken: {
    type: String,
    required: false,
  },
  passwordResetExpires: {
    type: Date,
    required: false,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  verificationTokenExpires: {
    type: Date,
    required: false,
  },
  // joinDate: {
  //   type: Date,
  //   required: true,
  //   default: Date.now(),
  // },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    select: false,
  },
  keepLoggedIn: {
    type: Boolean,
    required: false,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  
 
  
 
});

//Indexed fields for search
userSchema.index({ "$**": "text" });

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  
  // if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.lastUpdatedPassword = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  truePassword
) {
  return await bcrypt.compare(enteredPassword, truePassword);
};
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ accountActivated: { $ne: false } });
  next();
});

















userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // valid for 10 minutes only

  return resetToken;
};
userSchema.methods.createVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verificationTokenExpires = Date.now() + 259200000; // valid for 3 days  only

  return verificationToken;
};
userSchema.methods.checkPassword = async function (
  enteredPassword,
  truePassword
) {
  return await bcrypt.compare(enteredPassword, truePassword);
};


const User = mongoose.model("User", userSchema);

// singleton User model
module.exports = User;
