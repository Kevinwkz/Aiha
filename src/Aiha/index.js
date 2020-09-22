
module.exports = {
    // Structs
    Bot: require('./structures/AihaBot'),
    BaseEmbed: require('./structures/BaseEmbed'),
    Command: require('./structures/Command'),
    Event: require('./structures/Event'),
    PageEmbed: require('./structures/PageEmbed'),

    // Monitors
    MudaeObserver: require('./monitors/MudaeObserver'),
    Status: require('./monitors/GuildStatus'),

    // External
    Server: require('../../server'),
    API: require('../../api'),

    // Assets
    Developers: require('./config/json/devs.json'),
    Social: require('./config/json/Social.json'),

    // Misc
    ZeroWidthSpace: '​',
    VERSION: require('../../package.json').version
};