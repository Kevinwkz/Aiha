/**
 *      Kevinwkz - 2020/08/27
 */

const { 
    Internals, 
    Modules,
    Monitors, 
    Configuration,
    Util,
    API, 
    Server, 
    ZeroWidthSpace,
    VERSION,
} = require('../..');

const { inspect } = require('util');
const { color } = require('./.config.json');
const Discord = require('discord.js');

const md = 'js';
const limit = 30;

class Eval extends Internals.Command {
    constructor() {
        super('eval', {
            category: 'Developer',
            aliases: ['$'],
            hidden: true,
            dev: true,
        });
    }
    
    async run(msg, args, flags) {
       
        const Instance = msg.instance;

        args = args.join(' ').split('$', 2);
        const page = Math.max(0, parseInt(args[1] || '0') - 1);

        /* Shortcut variables */
        const { 
            author, 
            channel, 
            client, 
            guild, 
            target, 
        } = msg;

        const { 
            members, 
            users, 
        } = client;

        const server = Server;
        const [DB, db] = [server.Database, server.Database];
        //
        
        try {
            let evaled = await eval(flags.string.replace(/(.+?)(::)(.+?)/g, '$1.$3'));
            if (typeof evaled !== 'string') evaled = inspect(evaled);

            if (flags.collection.includes('noreturn')) {
                return await msg.react(Instance.emojis.get('name', 'bot2Success'));
            }
            
            evaled = evaled.split('\n');

            new Internals.PageEmbed(
                msg, 
                evaled
                    .map((e, i) => {
                        if (!(i % limit)) return `\`\`\`${md}\n${e}${i === evaled.length - 1 ? `\`\`\`` : ''}`;
                        if (!((i + 1) % limit) || i === evaled.length - 1) return `${e}\n\`\`\``;
    
                        return e;
                    }),
                limit,
                page,
            )
                .setTitle(`${Instance.emojis.get('name', 'botdev')}${`\ ${ZeroWidthSpace}`.repeat(4)}Saída`)
                .setColor(color)
                .send();
        } catch(e) {
            console.log(e);

            if (flags.collection.includes('noreturn')) {
                return await msg.react(Instance.emojis.get('name', 'bot2Cancel'));
            }
            
            target.send(
                new Internals.BaseEmbed()
                    .setTitle(`${Instance.emojis.get('name', 'bot2Cancel')}${`\ ${ZeroWidthSpace}`.repeat(4)}Erro`)
                    .setDescription(`\`\`\`${md}\n${e}\n\`\`\``)
                    .setColor(0xF44336)
            );

        }

    }
}

module.exports = Eval;