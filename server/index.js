// ✅ MUST BE FIRST LINE
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ✅ Import DB connection
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB BEFORE routes
connectDB();

// routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/resume", require("./routes/resume.route"));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// ✅ REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
