require("dotenv").config();

const express = require("express");
const cors = require("cors");

const prisma = require("./config/prisma");
const Authrouter = require("./modules/Authentication/auth.routes");

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", Authrouter);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();