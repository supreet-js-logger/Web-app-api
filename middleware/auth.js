const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

const User = require("../models/User");

const getReqToken = ({ authorization, cookies }) => {
  let token;
  if (authorization && authorization.startsWith("Bearer")) {
    [, token] = authorization.split(" ");
  } else if (cookies && cookies.token) {
    token = cookies.token;
  }
  return token;
};
// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  const token = getReqToken(req.headers);
  // Make sure token exisits
  if (!token) {
    next(new ErrorResponse("Not authorized to access this route", 401));
  }
  // verify token
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  req.user = await User.findById(decoded.id);
  return next();
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorResponse(
          `User with role ${res.user.role} is not authorized to access this route`,
          403,
        ),
      );
    }
    return next();
  };
};
