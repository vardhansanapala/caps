const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'seller'], default: 'user' },
    resetOtp: String,
    otpExpiry: Date,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate OTP
userSchema.methods.generateOtp = function () {
    const otp = crypto.randomInt(100000, 999999).toString();
    this.resetOtp = otp;
    this.otpExpiry = Date.now() + 10 * 60 * 1000; // Valid for 10 minutes
    return otp;
};

module.exports = mongoose.model('User', userSchema);
