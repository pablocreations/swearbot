// Keep-alive server (required for Render uptime)
require("./server.js");

// Load environment variables
require("dotenv").config();

// Discord bot
const { Client, GatewayIntentBits } = require("discord.js");
const Filter = require("leo-profanity");

// Configure profanity filter (default dictionary)
Filter.loadDictionary();

// Create the bot client with correct intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,           // Connect to servers
    GatewayIntentBits.GuildMessages,    // Read messages
    GatewayIntentBits.MessageContent    // Required to detect bad words
  ]
});

// When bot starts
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // Show bot as online
  client.user.setPresence({
    activities: [{ name: "Filtering bad words 😐", type: 0 }],
    status: "online"
  });
});

// Message Filter
client.on("messageCreate", (message) => {
  if (message.author.bot) return; // ignore bots

  if (Filter.check(message.content)) {
    message.delete().catch(() => {});
    message.channel.send(`⚠️ ${message.author}, watch your language.`)
      .then(msg => setTimeout(() => msg.delete().catch(() => {}), 3000));
  }
});

// Login the bot
client.login(process.env.TOKEN);
