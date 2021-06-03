const Discord = require('discord.js');
const prefix = "!";
const client = new Discord.Client({
    presence: {
        status: 'online',
        activity: {
            name: '!bestwaifu',
            type: 'PLAYING',
        },
    },
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
  
    const command = msg.content.slice(prefix.length).toLowerCase();

    if (command === 'bestwaifu') {
        const Urls = [
            'https://static.wikia.nocookie.net/tora-dora/images/8/82/E17_-_9.png/revision/latest?cb=20160728131220',
            'https://www.nautiljon.com/images/perso/00/61/taiga_aisaka_4516.jpg',
            'https://i.pinimg.com/originals/3e/2c/db/3e2cdb504a1d1cd814885ebdf971c6b8.jpg',
            'https://i.pinimg.com/originals/0d/d3/ac/0dd3ac5cac1cd782e0937acc720c5e9e.jpg',
            'https://i.ytimg.com/vi/aozedrjkMdo/maxresdefault.jpg'
        ];
        
        const url = Math.floor(Math.random() * Urls.length);
        msg.channel.send('Taiga Best Waifu ' + Urls[url]);
    }
});

client.login(process.env.TOKEN);