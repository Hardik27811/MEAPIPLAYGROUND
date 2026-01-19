const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes')

const app = express();

app.use(cookieParser());

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173",
  "https://meapiplayground-ten.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
