import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    height : {
      type: Number,
      required : true,
    },
    weight : {
      type: Number,
      required : true,
    },
    mobile : {
      type: Number,
      required : true,

    },
    gender : {
      type: String,
      required : true,
    },
    dob : {
      type: String,
      required : true,

    },
     resetPasswordToken: String, // <-- Add this line
    resetPasswordExpire: Date,  // <-- Add this line
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
