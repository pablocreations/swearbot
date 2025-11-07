// server.js
const express = require("express");
const app = express();

app.get("/", (_, res) => res.send("Bot is alive!"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌍 Web server running on port ${port}`));

