class Player {
    constructor(firstName, lastName, playerId) {
        this.firstName = firstName; this.lastName = lastName;
        this.playerId = playerId; this.games = null;
    }

    getFullName() {
        return this.firstName + " " + this.lastName
    }
}