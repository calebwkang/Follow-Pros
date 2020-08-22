
async function getPlayers()  {
    // clear table and model
    document.getElementById("table").innerHTML = "<tbody></tbody>"
    playersModel = [placeHolderPlayer]
    setLoadingButtonText('Loading Players...')


    // get the college selected
    var collegeSelect = document.getElementById("collegeSelect");
    var college = collegeSelect.options[collegeSelect.selectedIndex];

    // ensures user has selected both values
    if (college.value == "default") {
        this.alert("Select a college");
    } else {
        configureTable()
        let isSuccess = await makeQuery(QueryType.PLAYERS, college.text);
        setLoadingButtonText('Loading Stats...')
        if(isSuccess) {
            getPlayerStats()
        }
    }
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


function getPlayerStats() {
    var players = playersModel
    let promises = []

    for (i=1; i<players.length; i++) {
        let p = new Promise(async (resolve, reject) => {
            const isSuccess = await makeQuery(QueryType.PLAYER_STATS, i)
            
            if (isSuccess) {
                resolve()
            }
        })

        players[i].promise = p;
        promises.push(p)
    }

    Promise.all(promises).then(() => {
        formatRows()
    })
}

function formatRows() {
    // sort
    let players = playersModel;
    players.sort((a, b) => {
        return b.getFiveGameAverage()-a.getFiveGameAverage()
    })

    for (playerIndex=1; playerIndex<playersModel.length; playerIndex++) {
        var table = document.getElementById("table").getElementsByTagName("tbody")[0]
        var row = table.insertRow()
        let player = playersModel[playerIndex]

        
        var nameCell = row.insertCell(0)
        var name = document.createTextNode(player.getFullName())
        nameCell.setAttribute('class', 'name')
        nameCell.appendChild(name)

        var pointsCell = row.insertCell(1)
        var pointsText = document.createTextNode("Recent ppg: " + player.getFiveGameAverage())
        pointsCell.setAttribute('class', 'points')
        pointsCell.appendChild(pointsText)

        //make selectable
        nameCell.setAttribute('onclick', 'didSelectCell(' + playerIndex + ')')
        pointsCell.setAttribute('onclick', 'didSelectCell(' + playerIndex + ')')
    }

    let spinner = document.getElementById("loadingSpinner")
    spinner.style.visibility = 'hidden'
}

function didSelectCell(playerIndex) {
    alert("selected " + playersModel[playerIndex].getFullName())
}