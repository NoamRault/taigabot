const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
import randomInt from 'random-int';

client.on('ready', () => {
    client.user.setPresence({
        game: { name: '!bestwaifu' },
        status: 'online',
    });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
  
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'bestwaifu') {
        var a = randomInt(4);
        var url;
        switch(a) {
            case 0 : url = 'https://static.wikia.nocookie.net/tora-dora/images/8/82/E17_-_9.png/revision/latest?cb=20160728131220'; break;
            case 1 : url = 'https://www.nautiljon.com/images/perso/00/61/taiga_aisaka_4516.jpg'; break;
            case 2 : url = 'https://i.pinimg.com/originals/3e/2c/db/3e2cdb504a1d1cd814885ebdf971c6b8.jpg'; break;
            case 3 : url = 'https://i.pinimg.com/originals/0d/d3/ac/0dd3ac5cac1cd782e0937acc720c5e9e.jpg'; break;
            case 4 : url = 'https://i.ytimg.com/vi/aozedrjkMdo/maxresdefault.jpg'; break;
        }

        msg.channel.send('Taiga Best Waifu ' + url);
    }
});

client.login(process.env.TOKEN);