/**
 *      Kevinwkz - 2020/09/24
 */

const { Internals, API } = require('../..');
const { color } = require('./.config.json');

class Baka extends Internals.Command {
    constructor() {
        super('baka', {
            description: 'Chama o usuário mencionado de idiota.',
            usage: 'baka `[@membro]`',
            aliases: [],
            category: 'Diversão',
            botPerms: ['EMBED_LINKS'],
            multiChannel: true,
        });
    }

    async run(msg) {

        const bot = msg.instance;
        const target = msg.mentions.users.first() || msg.author;
        const req = await API.NekosLife.baka;

        const error = bot.emojis.get('bot2Cancel');

        const embed = new Internals.BaseEmbed()
            .setColor(color)
            .setDescription(`💢 **${msg.author.username}** ${
                target.equals(msg.author) ? 'chamou a si mesmo de idiota.' : `chamou <@${target.id}> de idiota.`
            }`)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setImage(req.url);

        msg.target.send(embed)
            .catch(e => {
                msg.target.send(
                    embed
                        .setDescription(`${error} **${e.message}**`)
                        .setColor(0xF44336)
                );
            });

    }
}

module.exports = Baka;