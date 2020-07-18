
function getPlayers()  {
    // get the college selected
    var collegeSelect = document.getElementById("collegeSelect");
    var college = collegeSelect.options[collegeSelect.selectedIndex];

    // ensures user has selected both values
    if (college.value == "default") {
        this.alert("Select a college");
    } else {
        makeQuery(QueryType.PLAYERS, college.text);
    }
}