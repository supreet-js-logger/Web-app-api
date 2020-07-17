const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

//Route files
const logs = require("./routes/logs");

const app = express();

//Dev logging middleware
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
//mount routes
app.use("/api/v1/logs", logs);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close & exit process
  server.close(() => process.exit(1));
});
