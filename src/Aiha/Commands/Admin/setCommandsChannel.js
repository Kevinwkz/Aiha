/**
 *      Kevinwkz - 2020/09/07
 */

const { Internals, Server } = require('../..');

class SetCommandsChannel extends Internals.Command {
    constructor() {
        super('setCommandsChannel', {
            description: 'Altera o canal de comandos do bot.',
            usage: 'setCommandsChannel `<canal>`',
            aliases: ['setcc', 'commandsChannel'],
            category: 'Admin',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['ADMINISTRATOR'],
        });
    }

    async run(Bot, msg, args) {
        
        const id = (args[0] || '')
            .replace(/[<#>]/g, '');
       
        const embed = new Internals.BaseEmbed();
        const success = Bot.emojis.get('bot2Success');
        const error = Bot.emojis.get('bot2Cancel');

        const guild = await msg.guild.fetch();
        const channel = guild.channels.cache.get(id);

        if (channel) {

            await Server.Database.request('PATCH', 'settings', { commandsChannel: channel.id })
                .then(res => {
                    embed
                        .setDescription(`${success} **O canal de comandos foi setado para** <#${res.commandsChannel}>**!**`);
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

module.exports = SetCommandsChannel;