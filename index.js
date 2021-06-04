const Discord = require('discord.js');
require('discord-reply');
require('dotenv').config();

// importation du package.json ---------------------
var pjson = require('./package.json');
// -------------------------------------------------

// règle le status de TaigaBot ---------------------
const prefix = ".";
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: '.help',
            type: 'PLAYING',
        },
    },
});
// -------------------------------------------------

// déclarations des emojis -------------------------
const emojiTaiga = '<:Taiga:850087986036867092>';
// -------------------------------------------------

// message de lancement ----------------------------
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// -------------------------------------------------

// répond aux messages et commandes ----------------
client.on('message', msg => {
    if (msg.author.id === '847525292918177792') { // répond à LeBot
        lebot(msg, msg.content);
    }
    else if (!msg.author.bot) {
        if (msg.content.startsWith(prefix)) { // répond si le message commence par un .
            commands(msg, msg.content.slice(prefix.length).toLowerCase());
        }
        else {
            easteregg(msg, msg.content.toLowerCase());
        }
    }
});
// -------------------------------------------------

// gère les réponses à LeBot -----------------------
function lebot(msg, str) {
    if (str === '-feur') {
        msg.lineReply('Ta gueule', {files: ['https://thumbs.gfycat.com/AmbitiousBothDalmatian-size_restricted.gif']});
    }
    if (str === 'deux') {
        msg.channel.send('trois');
    }
}
// -------------------------------------------------

// gère les commandes ------------------------------
function commands(msg, command) {
    switch(command) {
        case 'help' :
            help(msg);
            break;
        case 'about' :
            about(msg);
            break;
        case 'bestwaifu' :
            reponseImg(msg, 'Taiga Best Waifu');
            break;
        case 'spamtaiga' :
            spamTaiga(msg);
            break;
    }
}
// -------------------------------------------------

// gère les messages easter eggs -------------------
function easteregg(msg, str) {
    if (str.endsWith('fait')) {
        msg.channel.send('-sse');
    }
    if (str === 'a' || str.includes(' a ') || str.startsWith('a ') || str.endsWith(' a')) {
        msg.channel.send({files: ['https://i.pinimg.com/originals/d4/e1/72/d4e17229e7169a5f1df17934cab173c5.gif']});
    }
}
// -------------------------------------------------

// liste les commandes disponibles -----------------
function help(msg) {
    const helpEmbed = new Discord.MessageEmbed()
    .attachFiles(['img/taiga.jpg'])
	.setColor('#0099ff')
	.setTitle('Liste des commandes')
	.setDescription('Utilisez une commande en commençant un message par un point (ex : `.bestwaifu`)')
    .addField('Général', 'bestwaifu\n spamtaiga', true)
    .addField('Aide', 'help\n about', true)
	.setThumbnail('attachment://taiga.jpg')
	.setTimestamp()
	.setFooter('TaigaBot', 'attachment://taiga.jpg');

    msg.channel.send(helpEmbed);
}
// -------------------------------------------------

// affiche un "à propos" du bot --------------------
function about(msg) {
    const aboutEmbed = new Discord.MessageEmbed()
    .attachFiles(['img/taiga.jpg'])
	.setColor('#0099ff')
	.setTitle('TaigaBot')
	.setURL('https://github.com/NoamRault/taigabot')
	.setAuthor(pjson.author, 'attachment://taiga.jpg', 'https://github.com/NoamRault')
	.setDescription('v' + pjson.version + "\n" + pjson.description)
	.setThumbnail('attachment://taiga.jpg')
	.setTimestamp()
	.setFooter('Taiga Best Waifu', 'attachment://taiga.jpg');

    msg.channel.send(aboutEmbed);
}
// -------------------------------------------------

// spamme l'emoji Taiga entre 10 et 15 fois --------
function spamTaiga(msg) {
    let string = emojiTaiga;
    for (let i = 0; i < 10 + Math.floor(Math.random() * 5); i++) {
        string += ' ' + emojiTaiga;
    }
    msg.channel.send(string);
}
// -------------------------------------------------

// répond avec une image de Taiga ------------------
function reponseImg(msg, string) {
    const Imgs = [
        './img/taiga.jpg',
        './img/taiga1.png',
        './img/taiga2.jpg',
        './img/taiga3.jpg',
        './img/taiga4.jpg',
        './img/taiga5.jpg'
    ];
    
    const img = new Discord.MessageAttachment(Imgs[Math.floor(Math.random() * Imgs.length)]);
    msg.lineReply(emojiTaiga + ' ' + string + ' ' + emojiTaiga, img);
}
// -------------------------------------------------

// se connecte avec le token -----------------------
client.login(process.env.TOKEN);
// -------------------------------------------------