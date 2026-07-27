const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

const Authrouter = require('./modules/Authentication/auth.routes')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Authentication Routes
app.use('/api/auth/', Authrouter);

// Basic route
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