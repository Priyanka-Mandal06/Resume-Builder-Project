// ✅ MUST BE FIRST LINE
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ✅ Import DB connection
const connectDB = require("./config/db");

const app = express();

// ✅ CORS CONFIG (FIXES REGISTRATION ISSUE)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-builder-project-1whr-albf11v1.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware
app.use(express.json());

// ✅ Connect to MongoDB BEFORE routes
connectDB();

// ✅ Health check (optional but recommended)
app.get("/", (req, res) => {
  res.send("Resume Builder API is running 🚀");
});

// routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));
app.use("/api/resume", require("./routes/resume.route"));

// error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({
    message: err.message || "Something went wrong",
  });
});

// ✅ REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
