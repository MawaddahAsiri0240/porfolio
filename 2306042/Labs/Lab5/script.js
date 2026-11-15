
const data = [
    {
        name: "Joel Embiid",
        team: "PHI",
        points: 33,
        rebounds: 10.8,
        assists: 5.7
    },
    {
        name: "Jalen Brunson",
        team: "NYK",
        points: 32.4,
        rebounds: 3.3,
        assists: 7.5
    },
    {
        name: "Shai Gilgeous-Alexander",
        team: "OKC",
        points: 30.2,
        rebounds: 7.2,
        assists: 6.4
    },
    {
        name: "Tyrese Maxey",
        team: "PHI",
        points: 29.8,
        rebounds: 5.2,
        assists: 6.8
    },
    {
        name: "Donovan Mitchell",
        team: "CLE",
        points: 29.6,
        rebounds: 5.4,
        assists: 4.7
    }
];


// Get HTML elements
const playerRows = document.getElementById("player-rows");
const searchInput = document.getElementById("search");
const teamFilter = document.getElementById("team-filter");
const darkModeToggle = document.getElementById("dark-mode-toggle");


// Populate team dropdown
const teams = [...new Set(data.map(player => player.team))];

teams.forEach(function(team) {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
});


// Display players
function displayPlayers(players) {

    playerRows.innerHTML = "";

    players.forEach(function(player) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = player.name;

        const teamCell = document.createElement("td");
        teamCell.textContent = player.team;

        const pointsCell = document.createElement("td");
        pointsCell.textContent = player.points;

        const reboundsCell = document.createElement("td");
        reboundsCell.textContent = player.rebounds;

        const assistsCell = document.createElement("td");
        assistsCell.textContent = player.assists;

        row.appendChild(nameCell);
        row.appendChild(teamCell);
        row.appendChild(pointsCell);
        row.appendChild(reboundsCell);
        row.appendChild(assistsCell);

        playerRows.appendChild(row);

    });

}


// Search and filter players
function filterPlayers() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedTeam = teamFilter.value;

    const filteredPlayers = data.filter(function(player) {

        const matchesName =
            player.name.toLowerCase().includes(searchValue);

        const matchesTeam =
            selectedTeam === "all" ||
            player.team === selectedTeam;

        return matchesName && matchesTeam;

    });

    displayPlayers(filteredPlayers);

}


// Search event
searchInput.addEventListener("input", filterPlayers);


// Team filter event
teamFilter.addEventListener("change", filterPlayers);


// Dark mode event
darkModeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

});


// Mouseover event using event delegation
playerRows.addEventListener("mouseover", function(event) {

    const row = event.target.closest("tr");

    if (row && playerRows.contains(row)) {
        row.style.backgroundColor = "#ddd";
    }

});


// Mouseout event
playerRows.addEventListener("mouseout", function(event) {

    const row = event.target.closest("tr");

    if (row && playerRows.contains(row)) {
        row.style.backgroundColor = "";
    }

});


// Optional: Sort table by clicking headers
const headers = document.querySelectorAll("#player-stats th");

const sortKeys = ["name", "team", "points", "rebounds", "assists"];

let ascending = true;

headers.forEach(function(header, index) {

    header.addEventListener("click", function() {

        const players = [...data];

        const key = sortKeys[index];

        players.sort(function(a, b) {

            if (typeof a[key] === "string") {
                return ascending
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }

            return ascending
                ? a[key] - b[key]
                : b[key] - a[key];

        });

        ascending = !ascending;

        displayPlayers(players);

    });

});


// Display all five players when page loads
displayPlayers(data);
