
class CommandHandler {
    constructor(Bot) {
        const cmds = require('../Configuration/js/Commands');

        cmds.forEach(cmdClass => {
            const cmd = new cmdClass();

            Bot.commands.set(cmd.name.toLowerCase(), cmd);

            cmd.aliases.forEach(alias => {
                Bot.aliases.set(alias.toLowerCase(), cmd);
            });
        });

    }
}

module.exports = CommandHandler;