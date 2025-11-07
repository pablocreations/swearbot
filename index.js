// Keep-alive web server (REQUIRED for Render)
require("./server.js");

// Load .env variables
require("dotenv").config();

// Discord bot setup
const { Client, GatewayIntentBits } = require("discord.js");
const Filter = require("leo-profanity");

// Load default bad word dictionary
Filter.loadDictionary();

// Create bot client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,            // connect to servers
    GatewayIntentBits.GuildMessages,     // read messages
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences// necessary to detect message content
  ]
});

// When bot is ready
client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // Make bot actually show online
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

// Filter messages
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (Filter.check(message.content)) {
    message.delete().catch(() => {});
    
    message.channel.send(`⚠️ ${message.author}, watch your language.`)
      .then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), 3000);
      });
  }
});

// Login bot using token from secrets
client.login(process.env.TOKEN);
