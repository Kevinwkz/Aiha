/**
 *      Kevinwkz - 2020/09/09
 */

const { Event, BaseEmbed } = require('..');
const Logs = require('../lib/Logs');

class MessageDeleteEvent extends Event {
    constructor() {
        super({
            event: 'messageDelete',
            callback: (Bot, msg) => {

                if (!msg.content) return;
                
                const embed = new BaseEmbed()
                    .setAuthor('Mensagem Deletada', msg.author.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        { name: 'Usuário', value: `<@${msg.author.id}>`, inline: true },
                        { name: 'Canal', value: `<#${msg.channel.id}>`, inline: true },
                        { name: 'Conteúdo', value: `\`\`\`\n${msg.content}\n\`\`\`` },
                    );

                Logs(Bot, msg.channel, embed);
            }
        });
    }
}

module.exports = MessageDeleteEvent;