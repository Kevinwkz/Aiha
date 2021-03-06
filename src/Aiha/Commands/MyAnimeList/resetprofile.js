/**
 *      Kevinwkz - 2020/09/19
 */

const { Internals, Server } = require('../..');
const { color } = require('./.config.json');

class ResetProfile extends Internals.Command {
    constructor() {
        super('resetprofile', {
            description: 'Desvincula o seu perfil do MyAnimeList.',
            usage: 'resetprofile',
            aliases: ['resetpf'],
            category: 'MyAnimeList',
            blockFlags: ['double', 'twice'],
        });
    }

    async run(msg) {
        
        const bot = msg.instance;
        const embed = new Internals.BaseEmbed();

        Server.Database.request('PATCH', `users/${msg.author.id}`, { mal: '' })
            .then(() => {
                embed
                    .setDescription(`${bot.emojis.get('name', 'bot2Success')} **Perfil desvinculado com sucesso!**`)
                    .setColor(color);
            })
            .catch(() => {
                embed
                    .setDescription(`${bot.emojis.get('name', 'bot2Cancel')} **Ocorreu um erro ao tentar realizar esta tarefa.**`)
                    .setColor(0xF44336);
            })
            .finally(() => msg.target.send(embed));
        
    }
}

module.exports = ResetProfile;