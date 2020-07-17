const mongoose = require("mongoose");
// const colors = require("colors");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
  // eslint-disable-next-line no-console
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
