
import { gameloding, setTime, gameEnd } from './script.js';
import { stopeTimer } from './script.js';

const columns = document.querySelectorAll(".coloumn");
const select = document.getElementById("difficulty_level");
const solveBtn = document.querySelector(".solveBtn");
const newGame = document.querySelector(".newGame");
const selectNum = document.querySelector(".selectedNum");
const heartEmoji = document.querySelector(".heartemoji");
const gameOwerMsg = document.querySelector(".gameOwerMsg");
const mesag = document.querySelector(".mesage");

let solveFlatdata = "";
let textValue = "";
let countlife = 5;
let countIndex = new Set();
let blockDivs = [];
let count = [];
let data = "";

export const compleatGme = {
  gameFinished: false
};

function updateHearts() {
  heartEmoji.innerHTML = "";
  for (let i = 0; i < countlife; i++) {
    heartEmoji.innerHTML += "❤️";
  };

  if (countlife === 0) {
    compleatGme.gameFinished = true;
    gameEnd.isPaused = true;
    gameOwerMsg.innerHTML = "Game Over:you lose";
    mesag.innerHTML = "";
    console.log("game ennd");

  };
};


async function loadSudokuBoard(selectedGameLevel) {
  const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");// sudoku data get api

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const fetchdata = await response.json();
  data = fetchdata;

  if (compleatGme.gameFinished || gameEnd.isPaused) { // do not call lodusudokuboarder in this condition
    return;
  };

  setTime();
  updateHearts();
  gameloding();

  data.newboard.grids[0].difficulty = selectedGameLevel;

  // solved sudoku data
  const solveData = data.newboard.grids[0].solution;
  const solveValue = solveData.flat(); // 2d array in to 1d array
  solveFlatdata = solveValue;


  const value = data.newboard.grids[0].value;
  let flatValues = value.flat();
  blockDivs = [];

  for (let block = 0; block < 9; block++) {
    const startCol = (block % 3) * 3;
    const startRow = Math.floor(block / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const index = (startRow + i) * 9 + (startCol + j);
        blockDivs.push(columns[index]);
      };
    };
  };

  //  sudoku board value for the palayers's game
  blockDivs.forEach((cell, index) => {
    let cellValue = flatValues[index];
    cell.innerText = cellValue === 0 ? "" : cellValue;
  });

  //  Fill each div with its corresponding number
  blockDivs.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      let text = cell.innerText.trim(); // get the player texted value
      if (text === "") return;
      textValue = parseInt(text);
      const expectedValue = solveFlatdata[index];

      if (textValue === expectedValue) {  // check the value right position
        cell.style.backgroundColor = "green";
      } else {
        cell.style.backgroundColor = "red"
        mesag.innerHTML = "   That's the wrong position";
        setTimeout(() => {
          mesag.innerHTML = "";  // Clear the message after 4 seconds

        }, 4000);
      };

    });

  });

  solveBtn.addEventListener('click', () => {
    blockDivs.forEach((cell, index) => {
      let cellValue = solveFlatdata[index];
      cell.innerText = cellValue === 0 ? "" : cellValue;
      cell.style.backgroundColor = "#002D62";
      cell.style.color = "white";
      stopeTimer();
    });
  });

  let winTarget = [];
  let winTargetIndex = new Set();
  // check the player winning condition 
  columns.forEach(columns => {
    columns.addEventListener("click", () => {
      if (compleatGme.gameFinished) {
        return;
      };
      blockDivs.forEach((cell, index) => {
        let cellvalue = cell.innerText.trim();
        if (cellvalue === "" || isNaN(parseInt(cellvalue))) return;

        let values = parseInt(cellvalue);
        const expectedValue = solveFlatdata[index];

        if (values === expectedValue && !winTargetIndex.has(index)) {
          winTarget.push(values);
          winTargetIndex.add(index);
          if (winTarget.length === 81) {
            mesag.innerHTML = "  Congratulations! You solved the Sudoku! ";
            stopeTimer();
            compleatGme.gameFinished = true;
          };

        } else if (values !== expectedValue && !countIndex.has(index)) {
          count.push(values);
          countIndex.add(index);
          let countlength = count.length;
          countlife = 5 - count.length;

        } else {

        };
      });

      updateHearts();
    });
  });
};

solveBtn.addEventListener("click", () => {
  compleatGme.gameFinished = true;
  gameEnd.isPaused = true;
  gameOwerMsg.innerHTML = "";
});

// change the game difficulty leval
select.addEventListener("change", function () {

  countlife = 5;
  count = [];
  countIndex.clear();
  const selectedGameLevel = this.value;
  console.log("Changed to difficulty:", selectedGameLevel);
  loadSudokuBoard(selectedGameLevel);
  selectNum.innerHTML = "";
  mesag.innerHTML = "";
  updateHearts();
  columns.forEach(cell => {
    cell.style.backgroundColor = "#002D62";
  });
});

newGame.addEventListener("click", () => {
  compleatGme.gameFinished = false;
  countlife = 5;
  count = [];
  countIndex.clear();
  const selectedDifficulty = select.value;
  loadSudokuBoard(selectedDifficulty);
  updateHearts();
  selectNum.innerHTML = "";
  mesag.innerHTML = "";
  gameOwerMsg.innerHTML = "";
  columns.forEach(cell => {
    cell.style.backgroundColor = "#002D62";
  });
});

window.onload = () => {
  const defaultDifficulty = select.value;
  loadSudokuBoard(defaultDifficulty);
};