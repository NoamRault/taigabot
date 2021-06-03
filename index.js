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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '-feur') reponse(msg, 'Ta gueule');

    if (msg.content.startsWith(prefix)) { // message commence par un !
        const command = msg.content.slice(prefix.length).toLowerCase();

        if (command === 'help') help(msg);
        if (command === 'bestwaifu') reponse(msg, 'Taiga Best Waifu');
        if (command === 'spamtaiga') {
            let string = '<:Taiga:850087986036867092>';
            for (let i = 0; i < 10 + Math.floor(Math.random() * 5); i++) {
                string += ' <:Taiga:850087986036867092>';
            }
            msg.channel.send(string);
        }
    }
});

function help(msg) {
    const string = "```Commandes :\n"
                    + "  .bestwaifu\n"
                    + "  .spamtaiga\n"
                    + "```";
    msg.lineReply(string);
}

function reponse(msg, string) {
    const Urls = [
        'https://static.wikia.nocookie.net/tora-dora/images/8/82/E17_-_9.png/revision/latest?cb=20160728131220',
        'https://www.nautiljon.com/images/perso/00/61/taiga_aisaka_4516.jpg',
        'https://i.pinimg.com/originals/3e/2c/db/3e2cdb504a1d1cd814885ebdf971c6b8.jpg',
        'https://i.pinimg.com/originals/0d/d3/ac/0dd3ac5cac1cd782e0937acc720c5e9e.jpg',
        'https://i.ytimg.com/vi/aozedrjkMdo/maxresdefault.jpg'
    ];
    
    const url = Math.floor(Math.random() * Urls.length);
    msg.lineReply(string + ' ' + Urls[url] + ' <:Taiga:850087986036867092>');
}

client.login(process.env.TOKEN);