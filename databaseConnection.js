const mongoose = require('mongoose')

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Connection Error", error);
    process.exit(1);
  }
};

module.exports = DbConnection;