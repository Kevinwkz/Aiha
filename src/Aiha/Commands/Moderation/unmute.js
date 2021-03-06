/**
 *      Kevinwkz - 2020/08/27
 */

const { Internals, Modules } = require('../..');
const { MessageEmbed } = require('discord.js');
const { color } = require('./.config.json');

class Unmute extends Internals.Command {
    constructor() {
        super('unmute', {
            description: 'Tira o cargo de silenciamento de todos os membros citados.',
            usage: 'unmute `<@membros[]>` `[motivo]`',
            category: 'Moderação',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['MANAGE_ROLES'],
            blockFlags: ['double', 'twice'],
        });
    }

    async run(msg, args) {

        const bot = msg.instance;
        const embed = new MessageEmbed().setColor(0xe3c51b);
        const muteRole = Modules.MuteRole.get(msg.guild) || await Modules.MuteRole.create(msg.guild);

        const success = bot.emojis.get('name', 'bot2Success');
        const error = bot.emojis.get('name', 'bot2Cancel');
        const exclamation = bot.emojis.get('name', 'bot2Exclamation');

        if (!muteRole) 
            return msg.target.send(embed.setDescription(`${exclamation} **Não foi possível localizar o cargo de mute.**`));

        embed.setColor(0x1ba4e3);

        const members = new Set();
        const unmutedMembers = new Set();
        
        msg.mentions.members.forEach(m => m.roles.cache.has(muteRole.id) && members.add(m));

        if (!members.size) {
            embed
                .setDescription(`${exclamation} **Por favor, indique um membro válido.**`)
                .setColor(0xe3c51b);

            return msg.target.send(embed);
        }

        const reason = args.slice(members.size).join(' ') || 'Nenhum motivo foi registrado.';
        
        await Promise.all(
            [...members].map(member => new Promise(res => {

                if (member.manageable) 
                    member.unmute(reason, msg.author.id)
                        .then(() => unmutedMembers.add(member.id))
                        .catch()
                        .finally(res);
            }))
        );

        const MakeEmbed = () => {
            if (members.size < 2) {
        
                const member = [...members][0];
    
                if (unmutedMembers.has(member.id)) {
                    embed
                        .setDescription(`${success} \`${member.user.tag}\` **foi desmutado(a) com sucesso.**`)
                        .setColor(color);
                    
                    return;
                }

                embed
                    .setDescription(':person_gesturing_no: **Não foi possivel realizar o desmute do membro.**')
                    .setColor(0xF44336);
    
            } else {
    
                if (unmutedMembers.size) {
                    embed
                        .setTitle('Membros desmutados')
                        .setColor(color)
                        .setDescription([...members].map(m => 
                            `${unmutedMembers.has(m.id) ? success : error} **${m.user.tag}**`).join('\n')
                        );

                    return;
                }

                embed
                    .setDescription(':person_gesturing_no: **Não foi possivel realizar o desmute de nenhum dos membros citados.**')
                    .setColor(0xF44336);
                
            }
        };

        MakeEmbed();

        msg.target.send(embed);
        
    }
}

module.exports = Unmute;