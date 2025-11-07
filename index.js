require("./server.js"); // keep-alive web server

const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ✅ Bot Ready
client.once("clientReady", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  // Shows online status
  client.user.setPresence({
    activities: [{ name: "Filtering bad words 😐", type: 0 }],
    status: "online"
  });
});

// ✅ List of banned words
const bannedWords = ["badword1", "badword2", "badword3"]; // <-- Add more words here

// ✅ Message Filter
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  if (bannedWords.some(word => msg.includes(word))) {
    message.delete().catch(() => {});
    message.channel.send(`${message.author}, Watch your language 😐`).then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 3000);
    });
  }
});

// ✅ Login
client.login(process.env.TOKEN);
