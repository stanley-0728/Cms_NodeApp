const express = require("express");
const entityRoutes = require("./routes/entityRoutes");
const { connectToDatabase } = require("./utils/dbUtils");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
// Connect to the database

connectToDatabase();

// Routes
app.use("/api/entities", entityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
