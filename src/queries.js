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
                case QueryType.PLAYER_ID:
                    processPlayerStatsRequest(this)
                case QueryType.PLAYERS:
                    processPlayersRequest(this, data1)
            }
        }
    });

    var header = type

    switch(type) {
        case QueryType.PLAYER_ID:
            header += data1
    }

    xhr.open("GET", "https://api-nba-v1.p.rapidapi.com/" + header);
    xhr.setRequestHeader("x-rapidapi-host", "api-nba-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ab71a41c90mshf97209670d5d649p1c1145jsn9b9737f9b673");
    xhr.send(data);
}

/* this method processes the completed request for 
getting all players*/
function processPlayersRequest(request, college) {
    print("playeresponse:")
    print(request.response)
    
    // get all playes
    var players = request.response.api.players

    // filter by college
    var collegePlayers = filteredByCollege(players, college)

    // display data
    display(collegePlayers);
}

function processPlayerStatsRequest(request) {
    let stats = request.response.api.players[0]
    print(player.st)
}

/*IN: an array of player objects and a String name of a college
OUT: an array of players who went to that college*/
function filteredByCollege(players, college) {
    var result = [];

    for (i=0; i<players.length; i++) {
        if (players[i].collegeName.localeCompare(college) == 0) {
            result.push(players[i]);
        }
    }

    return result;
}

function display(players) {
    configureTable()
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
    

    var pointsCell = row.insertCell(1)
    var pointsText = document.createTextNode("some points")
    pointsCell.setAttribute('class', 'points')
    pointsCell.appendChild(pointsText)

    return row
}