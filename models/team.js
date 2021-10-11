class Team {
    constructor(manager) {
        this.manager = manager;
        this.engineers = [];
        this.interns = [];
    };

    getManager() {
        return this.manager;
    };

    getEngineers() {
        return this.engineers;

    };

    getInterns() {
        return this.interns;

    };

    addEngineer(engineer) {
        this.engineers.push(engineer);
    };

    addIntern(intern) {
        this.interns.push(intern);
    }
}

module.exports = Team;