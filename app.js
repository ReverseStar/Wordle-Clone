const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');


const worlde = 'SUPER';
const keys = [
    'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','<<'
];

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
];

let currentRow = 0;
let currentTile = 0;


guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id','guessRow-'+ guessRowIndex + '-tile-' + guessIndex);

        tileElement.classList.add('tile');

        rowElement.append(tileElement);
    })

    tileDisplay.append(rowElement);
})


keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.addEventListener('click',() => clickHandler(key));
    buttonElement.textContent = key;

    buttonElement.setAttribute('class', key);
    keyboard.append(buttonElement);
})

const clickHandler = (letter) => {
    console.log('Clicked', letter);
    addLetter(letter);
}

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
        console.log('guessRow', guessRows);
    }
}