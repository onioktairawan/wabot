require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const os = require('os');
const moment = require('moment');
const config = require('./config.json');

const client = new Client({ authStrategy: new LocalAuth() });
let startTime = new Date();
const OWNER = process.env.OWNER;

function saveConfig() {
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
}

function logToFile(msg) {
    fs.appendFileSync('log.txt', '[' + new Date().toLocaleString() + '] ' + msg + '\n');
}

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => {
    console.log('Bot siap!');
    logToFile('Bot aktif!');
});

client.on('message', async msg => {
    const from = msg.from;
    const sender = msg.author || msg.from;
    const contact = await msg.getContact();

    if (msg.body === config.prefix + "gstiker" && msg.hasQuotedMsg) {
        const quoted = await msg.getQuotedMessage();
        if (quoted.hasMedia) {
            const media = await quoted.downloadMedia();
            client.sendMessage(from, media, { sendMediaAsSticker: true });
        } else {
            client.sendMessage(from, await quoted.body, { sendMediaAsSticker: true });
        }
        logToFile(`[gstiker] oleh ${contact.pushname || contact.number}`);
        return;
    }

    if (msg.body === config.prefix + "gping") {
        const uptime = moment.duration(new Date() - startTime).humanize();
        const ping = Date.now() - msg.timestamp * 1000;
        const location = os.hostname();
        await msg.reply(`✅ Bot aktif\n📍 Lokasi: ${location}\n📡 Ping: ${ping}ms\n⏱️ Uptime: ${uptime}`);
        logToFile(`[gping] oleh ${contact.pushname || contact.number}`);
        return;
    }

    if (msg.body.startsWith(config.prefix + "setwelcome")) {
        if (sender !== OWNER) {
            await msg.reply("❌ Kamu tidak diizinkan menggunakan perintah ini.");
            return;
        }
        const newMessage = msg.body.slice((config.prefix + "setwelcome").length).trim();
        if (!newMessage) {
            await msg.reply("Format salah. Contoh: .setwelcome Selamat datang @user di #group");
            return;
        }
        config.welcomeMessage = newMessage;
        saveConfig();
        await msg.reply("✅ Pesan welcome berhasil diubah!");
        logToFile(`[setwelcome] oleh ${contact.pushname || contact.number}`);
        return;
    }

    if (msg.body.startsWith(config.prefix + "setprefix")) {
        if (sender !== OWNER) {
            await msg.reply("❌ Kamu tidak diizinkan menggunakan perintah ini.");
            return;
        }
        const args = msg.body.split(" ");
        if (args.length < 2) {
            await msg.reply("Format salah. Contoh: .setprefix !");
            return;
        }
        const newPrefix = args[1].trim();
        config.prefix = newPrefix;
        saveConfig();
        await msg.reply("✅ Prefix berhasil diubah menjadi: " + newPrefix);
        logToFile(`[setprefix] oleh ${contact.pushname || contact.number}`);
        return;
    }
});

client.on('group_join', async notif => {
    const chat = await notif.getChat();
    const contact = await notif.getContact();
    const welcomeText = config.welcomeMessage
        .replace('@user', `@${contact.number}`)
        .replace('#group', chat.name);
    chat.sendMessage(welcomeText, { mentions: [contact] });
});

client.initialize();
  
