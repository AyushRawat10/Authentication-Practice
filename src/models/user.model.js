import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateRefreshToken = async function () {
    jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

export const User = new mongoose.model("User", userSchema);