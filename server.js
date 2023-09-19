const dotenv = require("dotenv").config();
const express = require("express");
const contactRoutes = require("./routes/contactRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { connectToDb } = require("./config/dbConnection");

connectToDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
