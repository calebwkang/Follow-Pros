
// called when the user clicks the get my pros button
function getStats()  {

    // get the college selected
    var collegeSelect = document.getElementById("collegeSelect");
    var college = collegeSelect.options[collegeSelect.selectedIndex];

    // get the league seleted
    var leagueSelect = document.getElementById("leagueSelect");
    var league = leagueSelect.options[leagueSelect.selectedIndex];

    // ensures user has selected both values
    if (college.value == "default" || league.value == "default") {

        this.alert("Select a college and a league");

    } else {

        // makes query
        var data = makeQuery(college.text, league.text);
    }
}

// In: two strings representing the college and the league
// queries for players. filters by college and league
// and displays data
function makeQuery(college, league) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = "json";

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            data = this.response;

            var players = data.api.players

            var filtered = filteredByCollege(players, college)

            // display data
            display(filtered);
        }
    });

    xhr.open("GET", "https://api-nba-v1.p.rapidapi.com/players/league/standard");
    xhr.setRequestHeader("x-rapidapi-host", "api-nba-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ab71a41c90mshf97209670d5d649p1c1145jsn9b9737f9b673");
    xhr.send(data);
}

function display(data) {
    console.log(data);
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


