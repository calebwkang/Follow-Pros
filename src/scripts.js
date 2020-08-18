
function getPlayers()  {
    // clear table and model
    document.getElementById("table").innerHTML = "<tbody></tbody>"
    playersModel = [placeHolderPlayer]


    // get the college selected
    var collegeSelect = document.getElementById("collegeSelect");
    var college = collegeSelect.options[collegeSelect.selectedIndex];

    // ensures user has selected both values
    if (college.value == "default") {
        this.alert("Select a college");
    } else {
        configureTable()
        makeQuery(QueryType.PLAYERS, college.text);
    }
}