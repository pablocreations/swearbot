// server.js
const express = require("express");
const app = express();

// Homepage route for uptime checks
app.get("/", (req, res) => {
  res.send("✅ Bot is alive and running!");
});

// Render uses a dynamic port, so we cannot hardcode 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌍 Web server running on port ${PORT}`);
});
