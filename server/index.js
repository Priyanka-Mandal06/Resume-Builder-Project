const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoDB = require("./config/db");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const resumeRoutes = require("./routes/resume.route");

dotenv.config();

const app = express();

/* ================= DATABASE ================= */
mongoDB();

/* ================= MIDDLEWARES ================= */
app.use(
  cors({
    origin: ["http://localhost:5173", "https://YOUR-FRONTEND.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

/* ================= LOGGER ================= */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/data", resumeRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
