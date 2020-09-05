/**
 *      Kevinwkz - 2020/08/02
 */

const { Command, BaseEmbed } = require('../..');

class RemoveWarn extends Command {
    constructor() {
        super('removewarn', {
            description: 'Limpa todos as infrações registradas do membro citado.',
            usage: 'removewarn `[@membro]` `<#númeroDoCaso>`',
            aliases: ['rw'],
            category: 'Moderação',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['MANAGE_MESSAGES'],
        });
    }

    async run(Bot, msg, args) {

        const id = (args[0] || msg.author.id)
            .replace(/[<@!>&]/g, '');

        const warnCase = parseInt((args[1] || '#0').match(/#(\d+)/)[1]);
        const embed = new BaseEmbed();
        
        if (!id.length) {
            return msg.channel.send(
                    embed
                        .setDescription(`${Bot.emojis.get('bot2Exclamation')} **Mencione o usuário que deseja retirar a infração.**`)
                        .setColor(0xe3c51b)
            );
        }

        if (warnCase) {
            const infrations = (await Bot.server.request('GET', 'infrations'))[id];
            
            if (!infrations || !infrations.length) {

                embed.setDescription(`👼 **${member.user.username} não possui nenhuma infração registrada.**`);
            } else {
                const infration = infrations.find(inf => inf.case === warnCase);

                if (infration) {
                    await Bot.server.request('DELETE', `infrations/${id}/${warnCase}`)
                        .then(() => {
                            embed.setDescription(`${Bot.emojis.get('bot2Success')} **O Caso #${warnCase} foi removido com sucesso.**`);
                        })
                        .catch(() => {
                            embed
                                .setDescription(`${Bot.emojis.get('bot2Cancel')} **Ocorreu um erro ao tentar remover a infração.**`)
                                .setColor(0xF44336);
                        });

                } else {
                    embed
                        .setDescription(`${Bot.emojis.get('bot2Exclamation')} **O Caso #${warnCase} não foi encontrado.**`)
                        .setColor(0xe3c51b);
                }

            }

        }
        
        msg.channel.send(embed);
    }
}

module.exports = RemoveWarn;