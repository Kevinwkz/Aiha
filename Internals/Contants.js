
module.exports = {
    Package: require('../package.json'),
    Errors: require('./Errors'),
    ZeroWidthSpace: '​',
    PageSeparator: '$',
    ResultsCollector: {
        MAX_RESULTS: 7,
        TIMEOUT: 10000,
    },
    ConsoleColors: {
        NORMAL:     '[0m',
        BRIGHT:     '[1m',
        DIM:        '[2m',
        UNDERSCORE: '[4m',
        BLINK:      '[5m',
        REVERSE:    '[7m',
        HIDDEN:     '[8m',

        FG_BLACK:   '[30m',
        FG_RED:     '[31m',
        FG_GREEN:   '[32m',
        FG_YELLOW:  '[33m',
        FG_BLUE:    '[34m',
        FG_MAGENTA: '[35m',
        FG_CYAN:    '[36m',
        FG_WHITE:   '[37m',

        BG_BLACK:   '[40m',
        BG_RED:     '[41m',
        BG_GREEN:   '[42m',
        BG_YELLOW:  '[43m',
        BG_BLUE:    '[44m',
        BG_MAGENTA: '[45m',
        BG_CYAN:    '[46m',
        BG_WHITE:   '[47m'
    }
};