/**
 *      Kevinwkz - 2020/09/24
 */

const { Command, BaseEmbed, API } = require('../..');

class Waifu extends Command {
    constructor() {
        super('waifu', {
            description: 'Imagem aleatória de waifu.',
            usage: 'waifu',
            aliases: [],
            category: 'Imagem',
            botPerms: ['EMBED_LINKS'],
            multiChannel: true,
        });
    }

    async run(Bot, msg) {

        const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤎', '🤍'];
        const req = await API.NekosLife.waifu;
        const error = Bot.emojis.get('bot2Cancel');

        const embed = new BaseEmbed()
            .setTitle(`${hearts[Math.floor(Math.random() * hearts.length)]} Waifu`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setImage(req.url);

        msg.channel.send(embed)
            .catch(e => {
                msg.channel.send(
                    embed
                        .setDescription(`${error} **${e.message}**`)
                        .setColor(0xF44336)
                );
            });

    }
}

module.exports = Waifu;