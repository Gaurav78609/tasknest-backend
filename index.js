const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes")); // ✅ Task Route enabled

// ✅ MongoDB Connect + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
