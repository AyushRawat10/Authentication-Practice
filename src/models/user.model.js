import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },

  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    index: true
  },

  fullName: {
    type: String,
  }, 

  password: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  emailVerificationToken: {
    type: String,
  }, 

  emailVerificationExpiry: {
    type: Date,
  }, 

  forgotPasswordToken: {
    type: String,
  },

  forgotPasswordExpiry: {
    type: Date,
  }
}, 
{
    timestamps: true
}
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    const tokenExpiry = Date.now() + 20*60*1000

    return { unHashedToken, hashedToken, tokenExpiry }
}

export const User = new mongoose.model("User", userSchema);