require("./server.js"); // <-- This keeps the web server running

const { Client, GatewayIntentBits } = require("discord.js");
const Filter = require("leo-profanity");

// ---- Discord Client ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ---- Bot Ready ----
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  client.user.setActivity("Filtering bad words 😐");
});

// ---- Message Filter ----
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (Filter.check(message.content)) {
    message.delete().catch(() => {});
    message.channel.send(`⚠️ ${message.author}, language! This server filters bad words.`);
  }
});

// ---- Login ----
client.login(process.env.TOKEN);
