const express = require("express");
const dotenv = require("dotenv");

//Route files
const logs = require("./routes/logs");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//mount routes
app.use("/api/v1/logs", logs);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);