const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Organization = require("../models/Organization");

// Get token from model,create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// Get login details and send response
const getUserAndLogin = async (email, password, res, next) => {
  // check for user
  const user = await User.findOne({ email }).select("+password").populate({
    path: "organization",
    select: "name slug",
  });

  if (!user) return next(new ErrorResponse("User not found", 401));

  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  return sendTokenResponse(user, 200, res);
};
// @desc Register user
// @route POST /auth/register
// @access Public
// eslint-disable-next-line consistent-return
exports.register = asyncHandler(async (req, res, next) => {
  const { name, orgnaizationName, email, password } = req.body;
  let organization = await Organization.findOne({ name: orgnaizationName });
  let user = await User.findOne({ email });
  if (organization)
    return next(new ErrorResponse("Organization already exists", 400));
  if (user) return next(new ErrorResponse("User already exists", 400));
  organization = await Organization.create({ name: orgnaizationName });
  user = await User.create({
    name,
    email,
    password,
    organization: organization._id,
  });
  sendTokenResponse(user, 201, res);
});

// @desc Login user
// @route POST /auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // validate email and password
  if (!email || !password)
    return next(new ErrorResponse("Please provide an email and password", 400));
  return getUserAndLogin(email, password, res, next);
});

// @desc Get login user
// @route GET /auth/me
// @access Private
exports.getMe = asyncHandler(async (req, res) => {
  // check for user
  const user = await User.findById(req.user.id).populate({
    path: "organization",
    select: "name slug",
  });

  res.status(200).json({ success: true, data: user });
});
