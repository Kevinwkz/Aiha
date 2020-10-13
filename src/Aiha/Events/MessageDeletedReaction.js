/**
 *      Kevinwkz - 2020/10/13
 */

const { Monitors, Internals } = require('..');

class MessageReactedEvent extends Internals.Event {
    constructor() {
        super({
            event: 'messageReactionRemove',
            callback: async reaction => {

                if (reaction.emoji.name === '⭐') {
                    await Monitors.StarboardManager.check(reaction.message);
                }

            }
        });
    }
}

module.exports = MessageReactedEvent;