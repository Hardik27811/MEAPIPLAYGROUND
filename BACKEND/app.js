const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes')

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.VERCEL_URL || 'http://localhost:5173'
,
    credentials: true,
  })
);

app.use(express.json());


app.use("/auth", authRoutes);

app.use('/',profileRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK" 
  });
});

module.exports = app;
