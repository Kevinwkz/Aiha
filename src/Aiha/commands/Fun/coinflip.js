/**
 *      Kevinwkz - 2020/09/02
 */

const { Internals } = require('../..');

const tails = ['Cara', 'Coroa'];

class CoinFlip extends Internals.Command {
    constructor() {
        super('coinflip', {
            description: '',
            usage: 'coinflip',
            category: 'Diversão',
            botPerms: ['EMBED_LINKS'],
        });
    }

    run(Bot, msg) {

        const result = Math.floor(Math.random() * 2);

        msg.channel.send(
            new Internals.BaseEmbed()
                .setDescription(`${['👤', '👑'][result]} Você tirou **${tails[result]}**!`)
        );
        
    }
}

module.exports = CoinFlip;