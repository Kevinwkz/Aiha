
class Command {
    constructor(name, options) {
        
        this.name = name;
        this.aliases = options.aliases || [];
        this.category = options.category;
        this.description = options.description;
        this.usage = options.usage;
        this.userPerms = options.userPerms || [];
        this.botPerms = options.botPerms || [];
        this.blockFlags = options.blockFlags || [];
        this.hidden = options.hidden || false;
        this.dev = options.dev || false;
        this.multiChannel = options.multiChannel || false;
    }
}

module.exports = Command;