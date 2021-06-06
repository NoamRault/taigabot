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
            easterEgg(msg, msg.content.toLowerCase());
        }
    }
});
// -------------------------------------------------

// gère les réponses à LeBot -----------------------
function lebot(msg, str) {
    if (str === '-feur') {
        taGueule(msg);
    }
    if (str === 'deux') {
        msg.channel.send('trois');
    }
}
// -------------------------------------------------

// gère les commandes ------------------------------
function commands(msg, command) {
    const args = command.split(' ');
    switch(args[0]) {
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
        case 'tagueule' :
            if (args.length > 1) {
                taGueule(msg, args[1]);
            }
            else {
                taGueule(msg);
            }
            break;
        case 'a' :
            aGura(msg);
            break;
    }
}
// -------------------------------------------------

// gère les messages easter eggs -------------------
function easterEgg(msg, str) {
    if (str.endsWith('fait')) {
        msg.channel.send('-sse');
    }
    if (str === 'a' || str.includes(' a ') || str.startsWith('a ') || str.endsWith(' a')) {
        aGura(msg);
    }
}
// -------------------------------------------------

// liste les commandes disponibles -----------------
function help(msg) {
    const gen = ['bestwaifu', 'spamtaiga', 'a', 'tagueule'];
    const hel = ['help', 'about'];

    const helpEmbed = new Discord.MessageEmbed()
    .attachFiles(['img/taiga.jpg'])
	.setColor('#0099ff')
	.setTitle('Liste des commandes')
	.setDescription('Utilisez une commande en commençant un message par un point (ex : `.bestwaifu`)')
    .addField('Général', listTab(gen), true)
    .addField('Aide', listTab(hel), true)
	.setThumbnail('attachment://taiga.jpg')
	.setTimestamp()
	.setFooter('TaigaBot', 'attachment://taiga.jpg');

    msg.channel.send(helpEmbed);
}
// -------------------------------------------------

// liste les commandes disponibles -----------------
function listTab(tab) {
    let str = tab[0];
    for (let i=1; i<tab.length; i++) {
        str += '\n' + tab[i];
    }
    return str;
}

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

// répond "Ta gueule" avec un gif de Fanta ---------
function taGueule(msg, mention) {
    if (mention != null) {
        msg.delete();
        msg.channel.send('Ta gueule ' + mention, {files: ['https://thumbs.gfycat.com/AmbitiousBothDalmatian-size_restricted.gif']});
    }
    else {
        msg.lineReply('Ta gueule', {files: ['https://thumbs.gfycat.com/AmbitiousBothDalmatian-size_restricted.gif']});
    } 
}
// -------------------------------------------------

// envoie le gif "a" de Gura -----------------------
function aGura(msg) {
    msg.channel.send({files: ['https://i.pinimg.com/originals/d4/e1/72/d4e17229e7169a5f1df17934cab173c5.gif']});
}
// -------------------------------------------------

// se connecte avec le token -----------------------
client.login(process.env.TOKEN);
// -------------------------------------------------