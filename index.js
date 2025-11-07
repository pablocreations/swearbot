import "./server.js";
import express from "express";
import { Client, GatewayIntentBits } from "discord.js";
import leoProfanity from "leo-profanity";

// -------------------- KEEP BOT ALIVE --------------------
const app = express();
app.get("/", (req, res) => res.send("Bot is alive ✅"));
app.listen(3000, () => console.log("🌐 Keep-alive web server running"));


// -------------------- SETUP PROFANITY FILTER --------------------
leoProfanity.loadDictionary();


// -------------------- DISCORD CLIENT --------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});


// -------------------- MESSAGE HANDLER --------------------
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const msg = message.content;

  if (leoProfanity.check(msg)) {
    await message.delete().catch(() => {});
    await message.channel.send(`🚫 Hey <@${message.author.id}>! Watch your language!`);
  }
});


// -------------------- LOGIN --------------------
client.login(process.env.TOKEN);
