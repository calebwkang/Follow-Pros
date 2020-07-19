var playersModel = []
let placeHolderPlayer = {
    firstName: "first",
    lastName: "last"
}

function makeQuery(type, data1) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = "json";

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            print(this.responseURL)
            print(this.response)

            switch(type) {
                case QueryType.PLAYER_STATS:
                    processPlayerStatsRequest(this, data1)
                    break
                case QueryType.PLAYERS:
                    processPlayersRequest(this, data1)
                    break
            }
        }
    });

    var header = type

    switch(type) {
        case QueryType.PLAYER_STATS:
            header += playersModel[data1].playerId
    }

    xhr.open("GET", "https://api-nba-v1.p.rapidapi.com/" + header);
    xhr.setRequestHeader("x-rapidapi-host", "api-nba-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ab71a41c90mshf97209670d5d649p1c1145jsn9b9737f9b673");
    xhr.send(data);
}

/* this method processes the completed request for 
getting all players*/
function processPlayersRequest(request, college) {
    print("players response:")
    print(request.response)
    
    // get all playes
    var players = request.response.api.players

    // filter by college
    var collegePlayers = filteredByCollege(players, college)

    // display data
    display(collegePlayers);
}

function processPlayerStatsRequest(request, playerIndex) {
    print("player id stats: ")
    let stats = request.response.api.statistics
    let lastGame = stats[stats.length-1]
    print(lastGame)

    formatPoints(lastGame, playerIndex)
}

/*IN: an array of player objects and a String name of a college
OUT: an array of players who went to that college*/
function filteredByCollege(players, college) {
    var result = [];

    for (i=0; i<players.length; i++) {
        if (players[i].collegeName.localeCompare(college) == 0) {
            result.push(players[i]);
            playersModel.push(players[i])
        }
    }

    return result;
}

function display(players) {
    fillTable(players)
}


function configureTable() {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0]
    var headerRow = table.insertRow()
    
    var nameCell = headerRow.insertCell(0)
    var nameText = document.createElement('strong')
    nameText.innerHTML = 'NAME'
    nameCell.setAttribute('class', 'name')
    nameCell.appendChild(nameText)

    var pointsCell = headerRow.insertCell(1)
    var pointsText = document.createElement('strong')
    pointsText.innerHTML = "STATS"
    pointsCell.setAttribute('class', 'points')
    pointsCell.appendChild(pointsText)

    playersModel.push(placeHolderPlayer)
}


function fillTable(players) {
    for (i=0; i<players.length; i++) {
        var player = players[i]
        formatRow(player)
    }
}

function formatRow(player) {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0]
    var row = table.insertRow()
    
    var nameCell = row.insertCell(0)
    var name = document.createTextNode(player.firstName + " " + player.lastName)
    nameCell.setAttribute('class', 'name')
    nameCell.appendChild(name)
    
    makeQuery(QueryType.PLAYER_STATS, row.rowIndex)
    return row
}

function formatPoints(game, playerIndex) {
    var table = document.getElementById("table").getElementsByTagName("tbody")[0]
    var row = table.rows[playerIndex]

    var pointsCell = row.insertCell(1)
    var pointsText = document.createTextNode("Last Game: " + game.points + "pts")
    pointsCell.setAttribute('class', 'points')
    pointsCell.appendChild(pointsText)
}