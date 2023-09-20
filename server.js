const dotenv = require("dotenv").config();
const express = require("express");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const { errorHandler } = require("./middleware/errorHandler");
const { connectToDb } = require("./config/dbConnection");

connectToDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
