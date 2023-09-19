const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_CONNECTION);
    console.log(
      "Connected to database: ",
      connection.connection.host,
      connection.connection.name
    );
  } catch (error) {
    console.error(
      `An error occurred while connecting to database. For more details check:\n${error}`
    );
    process.exit(1);
  }
};

module.exports = { connectToDb };
