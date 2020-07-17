// const jwt = require("jsonwebtoken");
// const asyncHandler = require("./async");
// const ErrorResponse = require("../utils/errorResponse");

// const User = require("../models/User");

// const getReqToken = ({ authorization, cookies }) => {
//   let token;
//   if (authorization && authorization.startsWith("Bearer")) {
//     [, token] = authorization.split(" ");
//   } else if (cookies && cookies.token) {
//     token = cookies.token;
//   }
//   return token;
// };
// // Protect routes
// exports.protect = asyncHandler(async (req, res, next) => {
//   const token = getReqToken(req.headers);
//   // Make sure token exisits
//   if (!token) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }

//   try {
//     // verify token
//     const decoded = jwt.verify(token, "hasfnasdjfgkjhyn4567jkfg6546nk57u8");

//     req.user = await User.findById(decoded.id);
//     return next();
//   } catch (err) {
//     return next(new ErrorResponse("Not authorized to access this route", 401));
//   }
// });

// // Grant access to specific roles
// exports.authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorResponse(
//           `User with role ${res.user.role} is not authorized to access this route`,
//           403,
//         ),
//       );
//     }
//     return next();
//   };
// };
