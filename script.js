var numbersCalled = [];
var bingoGrid = [];
var quotes = [
    "lakers suck",
    "lesuck",
    "this is not good",
    "lets go",
    "oof",
    "WOOOO!",
    "WTF",
    "OOOOHHH",
    "What??",
    "NOOOO",
    "WHYYYYY",
    "You Suck",
    "cmon lebron",
    "fucking lebron",
    "OMG",
    "if they lose im not watching them anymore",
    "what are you doing?",
    "travel",
    "this is all your fault",
    "wait what?",
    "yes sir",
    "they lost",
    "UGHHH",
    "LEBRON THE GOATT"
];
function generateGrid() {
    // Clear previous grid
    document.getElementById("bingoGrid").innerHTML = '';

    // Generate random quotes for the grid
    bingoGrid = [];
    var columnIndices = [[], [], [], [], []]; // Array to store indices for each column

    // Shuffle indices from 0 to 24
    var shuffledIndices = Array.from({length: quotes.length}, (_, i) => i);
    for (var i = shuffledIndices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    // Insert empty cell in the middle (index 12)
    shuffledIndices.splice(12, 0, null);

    // Assign shuffled indices to each column
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            bingoGrid[j] = bingoGrid[j] || [];
            if (shuffledIndices[i * 5 + j] !== null) {
                bingoGrid[j].push(quotes[shuffledIndices[i * 5 + j]]);
            } else {
                bingoGrid[j].push("FREE"); // Assign empty string for the middle cell
            }
            columnIndices[j].push(shuffledIndices[i * 5 + j]);
        }
    }

    // Display the grid
    for (var i = 0; i < bingoGrid.length; i++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var j = 0; j < bingoGrid[i].length; j++) {
            var cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = bingoGrid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", markCell);
            row.appendChild(cell);
        }
        document.getElementById("bingoGrid").appendChild(row);
    }
}


function markCell() {

    if (!this.classList.contains("marked")) {
        this.classList.add("marked");
    } else {
        this.classList.remove("marked");
    }
    checkBingo();
}

function checkBingo() {
    var cells = document.getElementsByClassName("cell");
    var rows = [];
    var cols = [];
    var diag1 = [];
    var diag2 = [];
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("marked")) {
            var row = parseInt(cells[i].dataset.row);
            var col = parseInt(cells[i].dataset.col);
            rows[row] = (rows[row] || 0) + 1;
            cols[col] = (cols[col] || 0) + 1;
            if (row === col) {
                diag1.push(cells[i]);
            }
            if (row === 4 - col) {
                diag2.push(cells[i]);
            }
        }
    }
    if (rows.includes(5) || cols.includes(5) || diag1.length === 5 || diag2.length === 5) {
        alert("BINGO!");
    }
}


function callNumber() {
    var nextNumber;
    do {
        nextNumber = Math.floor(Math.random() * 75) + 1;
    } while (numbersCalled.includes(nextNumber));
    numbersCalled.push(nextNumber);

    // Update the grid to mark the called number
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent == nextNumber) {
            cells[i].classList.add("marked");
        }
    }
}

