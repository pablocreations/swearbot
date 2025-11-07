import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("✅ Server is running on port " + port);
});
