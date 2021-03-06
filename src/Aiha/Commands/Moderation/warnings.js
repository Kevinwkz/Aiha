/**
 *      Kevinwkz - 2020/09/02
 */

const { Internals, Server } = require('../..');
const { color } = require('./.config.json');
const moment = require('moment-timezone');

class Warnings extends Internals.Command {
    constructor() {
        super('warnings', {
            description: 'Exibe todos as suas infrações ou as do usuário marcado.',
            usage: 'warnings `[@membro]`',
            aliases: ['infractions'],
            category: 'Moderação',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['MANAGE_MESSAGES'],
            blockFlags: ['double', 'twice'],
        });
    }

    async run(msg, args) {

        const id = (args[0] || msg.author.id)
            .replace(/[<@!>&]/g, '');

        const infractions = (await Server.Database.request('GET', 'infractions') || [])
            .filter(inf => inf.userId === id);

        const member = await msg.guild.members.fetch(id || '').catch(() => {});

        if (!infractions || !infractions.length) {
            msg.channel.send(
                new Internals.BaseEmbed()
                    .setColor(color)
                    .setDescription(`👼 **${member ? member.user.username : 'Este usuário'} não possui nenhuma infração registrada.**`)
            );
        } else {
            new Internals.PageEmbed(
                msg, 
                infractions.map(w => 
                    `> 📕 \`#${w._case}\`\n`+ 
                    `> **Moderador:** <@${w.moderatorId}>\n` + 
                    `> **Data de Registro:** ${moment(w.createdTimestamp).format('hh:mm DD/MM/YYYY')}\n` +
                    `> **Descrição:** ${w.description}\n\n`
                ), 
                5
            )
                .setColor(color)
                .setAuthor(member ? member.user.tag : id, member ? member.user.displayAvatarURL({ dynamic: true }) : null)
                .send();
        }
        
    }
}

module.exports = Warnings;