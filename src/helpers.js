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