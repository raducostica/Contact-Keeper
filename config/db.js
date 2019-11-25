const mongoose = require("mongoose");

const config = require("config");

// grabs value from default.json file
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  console.log("MongoDB Connected...");
};

module.exports = connectDB;
