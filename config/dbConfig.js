const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectedDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected:${connectedDB.connection.host}`);
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
