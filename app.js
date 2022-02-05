const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");

const messageDisplay = document.querySelector(".message-container");

const wordle = "SUPER";
const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<<",
];

const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "guessRow-" + guessRowIndex);

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement("div");
        tileElement.setAttribute(
            "id",
            "guessRow-" + guessRowIndex + "-tile-" + guessIndex
        );

        tileElement.classList.add("tile");

        rowElement.append(tileElement);
    });

    tileDisplay.append(rowElement);
});

keys.forEach((key) => {
    const buttonElement = document.createElement("button");
    buttonElement.addEventListener("click", () => clickHandler(key));
    buttonElement.textContent = key;

    buttonElement.setAttribute("class", key);
    keyboard.append(buttonElement);
});

const clickHandler = (letter) => {
    console.log("Clicked", letter);
    if (letter === "<<") {
        deleteLetter();
        console.log("guessRows", guessRows);
        return;
    }

    if (letter === "ENTER") {
        checkRow();
        console.log("guessRows", guessRows);
        return;
    }

    addLetter(letter);
    console.log("guessRows", guessRows);
};

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute("data", letter);
        currentTile++;
        console.log("guessRow", guessRows);
    }
};

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById(
            "guessRow-" + currentRow + "-tile-" + currentTile
        );
        tile.textContent = "";
        guessRows[currentRow][currentTile] = "";
        tile.setAttribute("data", "");
    }
};

const checkRow = () => {
    const guess = guessRows[currentRow].join("");

    if (currentTile > 4) {
        console.log("guess is " + guess, "wordle is " + wordle);

        flipTile();

        if (guess === wordle) {
            showMessage("Awesome!");
            isGameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage("Game Over. Better Luck Next Time.");
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
};

const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 5000);
};

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
};

const flipTile = () => {
    const rowTile = document.querySelector(
        "#guessRow-" + currentRow
    ).childNodes;

    rowTile.forEach((tile, index) => {
        const dataLetter = tile.getAttribute("data");

        setTimeout(() => {
            tile.classList.add("flip");

            if (dataLetter == wordle[index]) {
                tile.classList.add("green-overlay");
                addColorToKey(dataLetter, "green-overlay");
            } else if (wordle.includes(dataLetter)) {
                tile.classList.add("yellow-overlay");
                addColorToKey(dataLetter, "yellow-overlay");
            } else {
                tile.classList.add("grey-overlay");
                addColorToKey(dataLetter, "grey-overlay");
            }
        }, 500 * index);
    });
};
