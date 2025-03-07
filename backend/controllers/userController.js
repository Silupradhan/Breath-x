import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
//  changes done
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log("e", process.env.EMAIL_USER, process.env.EMAIL_PASS);

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height : user.height,
      weight : user.weight,
      mobile : user.mobile,
      gender : user.gender,
      dob : user.dob,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,height,weight,mobile,gender,dob} = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    height,
    weight,
    mobile,
    gender,
    dob,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height : user.height,
      weight : user.weight,
      mobile : user.mobile,
      gender : user.gender,
      dob : user.dob,


    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      height : user.height,
      weight : user.weight,
      mobile : user.mobile,
      gender : user.gender,
      dob : user.dob,

    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.height = req.body.height || user.height;
    user.weight = req.body.weight || user.weight;
    user.mobile = req.body.mobile || user.mobile;
    user.gender = req.body.gender || user.gender;
    user.dob = req.body.dob || user.dob;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      height: updatedUser.height,
      weight: updatedUser.weight,
      mobile: updatedUser.mobile,
      gender: updatedUser.gender,
      dob: updatedUser.dob,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Request password reset
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  // const resetUrl = `${req.protocol}://${req.get('host')}/api/users/reset-password/${resetToken}`;
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Ensure this matches your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Ensure this environment variable is set
        pass: process.env.EMAIL_PASS, // Ensure this environment variable is set
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error); // Log the exact error
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(500).json({ message: 'Email could not be sent', error: error.message });
  }
});

// @desc    Reset password
// @route   PUT /api/users/reset-password/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid token');
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(res, user._id);

  res.status(200).json({ success: true, data: 'Password reset successful' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
};