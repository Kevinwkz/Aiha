const { readdirSync } = require('fs');
const path = require('path').join(__dirname, '..', 'src', 'Aiha', 'Events/');
const { Internals } = require('../src/Aiha');

const eventsDir = readdirSync(path);

class EventListener {
    constructor(Bot) {
        const files = eventsDir.filter(f => f.endsWith('.js'));

        files.forEach(f => {
            
            try {
                const exports = require(path + f);
                const event = new exports();

                Bot.client.on(event.name, (...args) => event.run(Bot, ...args));
                Bot.events.set(event.name, event);
            } catch(e) {
                Internals.Log('FG_RED', `[${f}] ` + e.message);
            }
            
        });
    }
}

module.exports = EventListener;