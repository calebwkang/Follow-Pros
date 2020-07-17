
// called when the user clicks the get my pros button
function getStats()  {

    // get the college selected
    var collegeSelect = document.getElementById("collegeSelect");
    var college = collegeSelect.options[collegeSelect.selectedIndex];

    // ensures user has selected both values
    if (college.value == "default") {
        this.alert("Select a college");
    } else {
        makeQuery(college.text);
    }
}

// In: two strings representing the college and the league
// queries for players. filters by college and league
// and displays data
function makeQuery(college) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = "json";

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            processRequest(this, college);
        }
    });

    xhr.open("GET", "https://api-nba-v1.p.rapidapi.com/players/league/standard");
    xhr.setRequestHeader("x-rapidapi-host", "api-nba-v1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "ab71a41c90mshf97209670d5d649p1c1145jsn9b9737f9b673");
    xhr.send(data);
}

function print(data) {
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

/* this method processes the completed request.
Takes in the request object, gets players filtered
by the specified college. then proceeds to display data*/
function processRequest(request, college) {
    print("response:")
    print(request.response)

    // get all playes
    var players = request.response.api.players

    // filter by college
    var filtered = filteredByCollege(players, college)

    // display data
    //display(filtered);
}


