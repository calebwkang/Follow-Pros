function print(data) {
    console.log(data);
}

const QueryType = {
    PLAYERS: 'players/league/standard',
    PLAYER_STATS: 'statistics/players/playerId/'
}

function setLoadingButtonText(text) {
    let button = document.getElementById("loadingSpinner")
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + text
}

function getModel() {
    let model = localStorage.getItem('model')

    if (model == null) {
        let placeHolderPlayer = new Player("name", "last", -1)
        return [placeHolderPlayer]
    } else {
        // parse string into an object;
        let modelObject = Object.assign([Player], JSON.parse(model))

        return modelObject
    }
}

function resetModel() {
    localStorage.removeItem('model')
}

function parsePlayer(playerIndex) {
    return Object.assign(new Player(), getModel()[playerIndex])
}