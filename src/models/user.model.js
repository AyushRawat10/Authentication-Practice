import mongoose, { Schema } from "mongoose";

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
    required: true,
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

export const User = new mongoose.model("User", userSchema);