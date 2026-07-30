require("dotenv").config();
// Package imported 
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma");
const app = express();
const PORT = 5000;

//External Imported modules 
const Authrouter = require("./modules/Authentication/auth.routes");
const Profilerouter = require("./modules/Profile/profile.route")


app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", Authrouter);
app.use("/profile", Profilerouter)


app.get("/server", (req, res) => {
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
