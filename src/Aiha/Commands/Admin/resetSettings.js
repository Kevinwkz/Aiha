/**
 *      Kevinwkz - 2020/09/07
 */

const { Internals, Server } = require('../..');
const { color } = require('./.config.json');

class ResetSettings extends Internals.Command {
    constructor() {
        super('resetSettings', {
            description: 'Reseta as configurações do servidor para o padrão.',
            usage: 'resetSettings',
            aliases: ['resetst'],
            category: 'Admin',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['ADMINISTRATOR'],
            blockFlags: ['double', 'twice'],
        });
    }

    async run(msg) {
       
        const bot = msg.instance;
        const embed = new Internals.BaseEmbed().setColor(color);
        const success = bot.emojis.get('name', 'bot2Success');
        const error = bot.emojis.get('name', 'bot2Cancel');

        await Server.Database.request('POST', 'settings')
            .then(() => {
                embed.setDescription(`${success} **As configurações do servidor foram resetadas para o padrão.**`);
            })
            .catch(() => {
                embed
                    .setDescription(`${error} **Ocorreu um erro ao tentar resetar as configurações do servidor.**`)
                    .setColor(0xF44336);
            });
        
        msg.target.send(embed);
    }
}

module.exports = ResetSettings;