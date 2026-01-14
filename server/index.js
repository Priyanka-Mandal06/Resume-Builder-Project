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
    origin: true, // ✅ allow Vercel dynamically
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false, // ✅ IMPORTANT: you are NOT using cookies
  })
);

// ✅ Handle preflight explicitly
app.options("*", cors());

// middleware
app.use(express.json());

// ✅ Connect to MongoDB BEFORE routes
connectDB();

// ✅ Health check (optional but recommended)
app.get("/", (req, res) => {
  res.send("Resume Builder API is running 🚀");
});

// 🔁 Keep Render alive (prevents cold start issues)
setInterval(() => {
  fetch("https://resume-builder-project-ys6t.onrender.com");
}, 1000 * 60 * 10); // every 10 minutes

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
