const Discord = require('discord.js');

require('discord-reply');
require('dotenv').config();

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
        if (msg.content === '-feur') reponseImg(msg, 'Ta gueule');
        if (msg.content === 'deux') msg.channel.send('trois');
    }

    else if (msg.content.startsWith(prefix)) { // répond si le message commence par un .
        const command = msg.content.slice(prefix.length).toLowerCase();

        if (command === 'help') help(msg);
        if (command === 'bestwaifu') reponseImg(msg, 'Taiga Best Waifu');
        if (command === 'spamtaiga') spamTaiga(msg);
    }
});
// -------------------------------------------------

// liste les commandes disponibles -----------------
function help(msg) {
    const string = "```Commandes :\n"
                    + "  .help\n"
                    + "  .bestwaifu\n"
                    + "  .spamtaiga\n"
                    + "```";
    msg.lineReply(string);
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
    const Urls = [
        'https://static.wikia.nocookie.net/tora-dora/images/8/82/E17_-_9.png/revision/latest?cb=20160728131220',
        'https://www.nautiljon.com/images/perso/00/61/taiga_aisaka_4516.jpg',
        'https://i.pinimg.com/originals/3e/2c/db/3e2cdb504a1d1cd814885ebdf971c6b8.jpg',
        'https://i.pinimg.com/originals/0d/d3/ac/0dd3ac5cac1cd782e0937acc720c5e9e.jpg',
        'https://i.ytimg.com/vi/aozedrjkMdo/maxresdefault.jpg'
    ];
    
    const url = Math.floor(Math.random() * Urls.length);
    msg.lineReply(string + ' ' + Urls[url] + ' ' + emojiTaiga);
}
// -------------------------------------------------

// se connecte avec le token -----------------------
client.login(process.env.TOKEN);
// -------------------------------------------------