/**
 *      Kevinwkz - 2020/09/11
 */

const { Internals, Server } = require('../..');
const { color } = require('./.config.json');

class WelcomeRoles extends Internals.Command {
    constructor() {
        super('welcomeRoles', {
            description: 'Exibe a lista de cargos de bem-vindo.',
            usage: 'welcomeRoles',
            aliases: ['wrs'],
            category: 'Admin',
            botPerms: ['EMBED_LINKS'],
            userPerms: ['ADMINISTRATOR'],
        });
    }

    async run(msg) {
        
        const welcomeRoles = (await Server.Database.request('GET', 'settings')).welcomeRoles || [];
        
        msg.target.send(
            new Internals.BaseEmbed()
                .setColor(color)
                .setTitle('Cargos de Bem-vindo')
                .setDescription(
                    welcomeRoles && welcomeRoles.length
                        ? welcomeRoles.map(id => `<@&${id}>`).join('\n')
                        : 'Nenhum cargo foi adicionado.'
                )
        );

    }
}

module.exports = WelcomeRoles;