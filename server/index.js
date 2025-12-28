const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const resumeRoutes = require("./routes/resume.route");

dotenv.config();

const app = express();

// database
mongoDB();

// middlewares
app.use(cors());
app.use(express.json());

// request logger (MOVE UP)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", resumeRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
