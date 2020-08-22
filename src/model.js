class Player {
    constructor(firstName, lastName, playerId) {
        this.firstName = firstName; this.lastName = lastName;
        this.playerId = playerId; this.games = null; this.promise = null;
    }

    getFullName() {
        return this.firstName + " " + this.lastName
    }

    getFiveGameAverage() {
        if (this.games != null) {
            let points = 0

            for(i=this.games.length-5; i<this.games.length; i++) {
                let pointsString = this.games[i].points
                let pointsNumber = Number(pointsString)
                points += pointsNumber
            }

            return points/5;
        }
    }
}

let placeHolderPlayer = new Player("name", "last", -1)
let playersModel = [placeHolderPlayer]