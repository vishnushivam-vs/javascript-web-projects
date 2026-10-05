
import { compleatGme } from './game.js';
const newGameBtn = document.querySelector(".newGame");
const coloumns = document.querySelectorAll(".coloumn");
let values = document.querySelectorAll(".numbers");
const mainColoumn = document.querySelectorAll(".mainColoumn");
const mesage = document.querySelector(".mesage");
const selectNum = document.querySelector(".selectedNum");
const timeElement = document.querySelector(".timer");
const pauseButton = document.getElementById("pauseButton");
const changeBtn = document.getElementById("difficulty_level");
const solveBtn = document.querySelector(".solveBtn");

let numbers = "";

let firstRow = [];
let secondRow = [];
let thirdRow = [];
let fourthRow = [];
let fifthRow = [];
let sixthRow = [];
let seventhRow = [];
let eighthRow = [];
let ninthRow = [];


let firstVerticalRow = [];
let secondVerticalRow = [];
let thirdVerticalRow = [];
let fourthVerticalRow = [];
let fifthVerticalRow = [];
let sixthVerticalRow = [];
let seventhVerticalRow = [];
let eighthVerticalRow = [];
let ninthVerticalRow = [];
let allColoumValues = [];

export const gameEnd = {
    isPaused: false
}

let startingMinutes = 15;
let timerId = null;

// set Time 
export function setTime() {
    let time = startingMinutes * 60;
    // Store timer interval ID
    // Track pause state
    if (timerId !== null) {
        clearInterval(timerId);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timeElement.innerHTML = `${minutes}:${seconds}`;
    }

    function countDownTime() {
        if (!gameEnd.isPaused && time > 0) {
            time--;
            updateTimerDisplay();
        }

        if (time <= 0) {
            clearInterval(timerId);
            pauseButton.remove();
            timeElement.style.color = "red";
            timeElement.innerHTML = " Time out Game over";
            compleatGme.gameFinished = true;
            gameEnd.isPaused = true;
        }
    }

    // Start the timer
    updateTimerDisplay();
    timerId = setInterval(countDownTime, 1000);

}
// time stope condition
pauseButton.addEventListener("click", () => {
    gameEnd.isPaused = !gameEnd.isPaused;
    pauseButton.innerText = gameEnd.isPaused ? "Resume" : "Pause";

});

export function stopeTimer() {
    clearInterval(timerId)
}

//
function gameColoumnValues() {

    const allDivs = document.querySelectorAll(".coloumn");
    // horizontal coloumn values get
    for (let block = 0; block < 9; block++) {
        const startCol = (block % 3) * 3;
        const startRow = Math.floor(block / 3) * 3;
        const blockDivs = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) { // columns postion alignment horizontal leval
                const index = (startRow + i) * 9 + (startCol + j);
                blockDivs.push(allDivs[index]);
            };
        };
        allColoumValues.push(blockDivs);
    };
    //values push each horizontal arrays
    firstRow = allColoumValues[0].map(div => div.innerText);
    secondRow = allColoumValues[1].map(div => div.innerText);
    thirdRow = allColoumValues[2].map(div => div.innerText);
    fourthRow = allColoumValues[3].map(div => div.innerText);
    fifthRow = allColoumValues[4].map(div => div.innerText);
    sixthRow = allColoumValues[5].map(div => div.innerText);
    seventhRow = allColoumValues[6].map(div => div.innerText);
    eighthRow = allColoumValues[7].map(div => div.innerText);
    ninthRow = allColoumValues[8].map(div => div.innerText);

    // vertical coloumns values get
    let verticalBlocks = [];
    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const group = [];

            for (let i = 0; i < 3; i++) { // rows within block
                for (let j = 0; j < 3; j++) { //columns postion alignment vertical leval
                    const row = i * 3 + blockRow;
                    const col = j * 3 + blockCol;
                    const index = row * 9 + col;
                    group.push(allDivs[index]);
                }
            }
            verticalBlocks.push(group);
        }
    }
    // values push vertical arrays
    firstVerticalRow = verticalBlocks[0].map(div => div.innerText);
    secondVerticalRow = verticalBlocks[1].map(div => div.innerText);
    thirdVerticalRow = verticalBlocks[2].map(div => div.innerText);
    fourthVerticalRow = verticalBlocks[3].map(div => div.innerText);
    fifthVerticalRow = verticalBlocks[4].map(div => div.innerText);
    sixthVerticalRow = verticalBlocks[5].map(div => div.innerText);
    seventhVerticalRow = verticalBlocks[6].map(div => div.innerText);
    eighthVerticalRow = verticalBlocks[7].map(div => div.innerText);
    ninthVerticalRow = verticalBlocks[8].map(div => div.innerText);
};

gameColoumnValues();

// duplicate values finding horizontaal values and change color
function duplicateHorizontalClm(arrays, index) {
    let count = {};
    let duplicate = [];
    const allDivs = document.querySelectorAll(".coloumn");
    const blocks = [];

    arrays.forEach(value => {

        if (value !== "") {
            count[value] = (count[value] || 0) + 1;
        };
    });

    for (let value in count) {
        if (count[value] > 1) {
            duplicate.push(value);
        };
    };

    for (let block = 0; block < 9; block++) {
        const startCol = (block % 3) * 3;
        const startRow = Math.floor(block / 3) * 3;
        const blockDivs = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const index = (startRow + i) * 9 + (startCol + j);
                blockDivs.push(allDivs[index]);
            };
        };
        blocks.push(blockDivs);
    };

    blocks[index].forEach(div => {
        let value = div.textContent.trim();
        if (duplicate.includes(value)) {
            div.style.backgroundColor = "red";

        } else {
            div.style.backgroundColor = " ";
        };
    });

};
//find duplicate values in vertical arrays and change color
function duplicateVerticalRow(verticalArray, index) {

    const allDivs = document.querySelectorAll(".coloumn");
    const verticalBlocks = [];
    let count = {};
    let duplicate = [];

    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            const group = [];

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const row = i * 3 + blockRow;
                    const col = j * 3 + blockCol;
                    const index = row * 9 + col;
                    group.push(allDivs[index]);
                };
            };
            verticalBlocks.push(group);
        };
    };

    verticalArray.forEach(value => {
        if (value !== "") {
            count[value] = (count[value] || 0) + 1;
        };
    });

    for (let value in count) {
        if (count[value] > 1) {
            duplicate.push(value);
        };
    };

    verticalBlocks[index].forEach(div => {
        let value = div.textContent.trim();
        if (duplicate.includes(value)) {
            div.style.backgroundColor = "red";

        } else {
            div.style.backgroundColor = " ";
        };
    });
};

//find each 3 * 3 couloumns dupliccate values and color change

function duplicateGameColoumn() {
    let duplicate = []
    mainColoumn.forEach(coloumn => {
        const coloumns = coloumn.querySelectorAll(".coloumn");
        let valueCounts = {};
        coloumns.forEach(innerclm => {
            const value = innerclm.innerText;
            if (value) {
                if (valueCounts[value]) {
                    valueCounts[value].count += 1;
                    valueCounts[value].elements.push(innerclm);
                } else {
                    valueCounts[value] = { count: 1, elements: [innerclm] }
                };
            };
        });
        for (let key in valueCounts) {
            if (valueCounts[key].count > 1) {
                duplicate.push(key);
                valueCounts[key].elements.forEach(element => {
                    element.style.backgroundColor = 'red';
                });
            } else {
                valueCounts[key].elements.forEach(element => {
                    element.style.backgroundColor = '';
                });
            };
        };
    });
};
//get selected number 
values.forEach(div => {
    div.addEventListener('click', (event) => {
        numbers = event.target.innerText;
        selectNum.innerHTML = numbers;
    });
});


solveBtn.addEventListener("click", () => {
    numbers = "";
    mesage.innerHTML = "solution";
    timeElement.innerHTML = "";
    gameEnd.isPaused = true;
});

export function gameloding() {

    let coloumn = document.querySelectorAll(".coloumn");
    coloumn.forEach(coloumn => {
        coloumn.addEventListener('click', (num) => {
            if (gameEnd.isPaused || !numbers) {
                return; // game stope condition
            };
            num.target.innerText = numbers;
            duplicateGameColoumn();
            gameColoumnValues();

            duplicateHorizontalClm(firstRow, 0);
            duplicateHorizontalClm(secondRow, 1);
            duplicateHorizontalClm(thirdRow, 2);
            duplicateHorizontalClm(fourthRow, 3);
            duplicateHorizontalClm(fifthRow, 4);
            duplicateHorizontalClm(sixthRow, 5);
            duplicateHorizontalClm(seventhRow, 6);
            duplicateHorizontalClm(ninthRow, 8);
            duplicateHorizontalClm(eighthRow, 7);

            duplicateVerticalRow(firstVerticalRow, 0);
            duplicateVerticalRow(secondVerticalRow, 1);
            duplicateVerticalRow(thirdVerticalRow, 2)
            duplicateVerticalRow(fourthVerticalRow, 3);
            duplicateVerticalRow(fifthVerticalRow, 4);
            duplicateVerticalRow(sixthVerticalRow, 5);
            duplicateVerticalRow(seventhVerticalRow, 6);
            duplicateVerticalRow(eighthVerticalRow, 7);
            duplicateVerticalRow(ninthVerticalRow, 8);
        });
    });
};

newGameBtn.addEventListener("click", () => {
    numbers = "";
    gameEnd.isPaused = false;
    timeElement.style.color = 'white';

});





