const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// eslint-disable-next-line no-unused-vars
const colors = require("colors");
const connectDB = require("./config/db");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

// Route files
const logs = require("./routes/logs");

const app = express();

// Dev logging middleware
process.env.NODE_ENV === "development" && app.use(morgan("dev"));

// mount routes
app.use("/api/v1/logs", logs);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  // eslint-disable-next-line no-console
  console.log(`Error: ${err.message}`.red);
  // close & exit process
  server.close(() => process.exit(1));
});
