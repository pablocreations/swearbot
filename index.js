// Keep-alive server (required for Render)
require("./server.js");

// Load .env
require("dotenv").config();

// Discord
const { Client, GatewayIntentBits } = require("discord.js");
const Filter = require("leo-profanity");

// Load bad words dictionary
Filter.loadDictionary();

// Create Bot Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,            // Connect to servers
    GatewayIntentBits.GuildMessages,     // Read messages
    GatewayIntentBits.MessageContent     // Detect message content
  ]
});

// On bot ready
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // Show bot online
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "Filtering bad words 😐",
        type: 0 // Playing
      }
    ]
  });
});

// Filter Messages
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (Filter.check(message.content)) {
    message.delete().catch(() => {});
    message.channel.send(`⚠️ ${message.author}, watch your language.`)
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 3000));
  }
});

// Login Bot
client.login(process.env.TOKEN);
