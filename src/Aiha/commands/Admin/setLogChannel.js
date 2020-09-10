/**
 *      Kevinwkz - 2020/09/09
 */

const { Command, BaseEmbed } = require('../..');

class SetLogChannel extends Command {
    constructor() {
        super('setLogChannel', {
            description: 'Altera o canal de logs do bot.',
            usage: 'setLogChannel `<canal>`',
            aliases: ['setlc', 'logChannel'],
            category: 'Admin',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['ADMINISTRATOR'],
        });
    }

    async run(Bot, msg, args) {
        
        const id = (args[0] || '')
            .replace(/[<#>]/g, '');
       
        const embed = new BaseEmbed();
        const success = Bot.emojis.get('bot2Success');
        const error = Bot.emojis.get('bot2Cancel');

        const guild = await msg.guild.fetch();
        const channel = guild.channels.cache.get(id);

        if (channel) {

            await Bot.server.request('PATCH', 'settings', { logChannel: channel.id })
                .then(res => {
                    embed
                        .setDescription(`${success} **O canal de logs foi setado para** <#${res.logChannel}>**!**`);
                })
                .catch(err => {
                    console.log(err);

                    embed
                        .setDescription(`${error} **Ocorreu um erro ao tentar registrar o canal.**`)
                        .setColor(0xF44336);
                });
        } else {
            embed
                .setDescription(`${error} **O Canal não foi encontrado.**`)
                .setColor(0xF44336);
        }

        msg.channel.send(embed);
    }
}

module.exports = SetLogChannel;