async function makeQuery(type, data1) {
    let spinner = document.getElementById("loadingSpinner")
    spinner.style.visibility = 'visible'

    var header = type

    switch(type) {
        case QueryType.PLAYER_STATS:
            header += playersModel[data1].playerId
    }

    const result = fetch("https://api-nba-v1.p.rapidapi.com/" + header, {
	    "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "ab71a41c90mshf97209670d5d649p1c1145jsn9b9737f9b673",
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

    .then(response => {
        switch(type) {
            case QueryType.PLAYER_STATS:
                processPlayerStatsRequest(response, data1)
                return response
            case QueryType.PLAYERS:
                processPlayersRequest(response, data1)
                return response
        }
    })
    .catch(err => {
        console.log(err);
    });

    const isSuccess = await result;
    return isSuccess != null
}

/* this method processes the completed request for 
getting all players*/
function processPlayersRequest(response, college) {
    print("players response:")
    print(response)
    
    // get all playes
    var players = response.api.players

    // filter by college and grab promises
    filteredByCollege(players, college)
}

function processPlayerStatsRequest(response, playerIndex) {
    print("player id stats: ")
    let stats = response.api.statistics
    print(stats)

    playersModel[playerIndex].games = stats
}

/*IN: an array of player objects and a String name of a college
OUT: an array of promises for each player's games*/
function filteredByCollege(players, college) {

    for (i=0; i<players.length; i++) {
        if (players[i].collegeName.localeCompare(college) == 0) {

            let first = players[i].firstName
            let last = players[i].lastName
            let id = players[i].playerId

            let player = new Player(String(first), String(last), id)
            playersModel.push(player)
        }
    }
}