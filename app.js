"use-strict";

//Create a snake array, grid is an array from 0 - 25^2, snake length is array
//Use .pop() and .unshift(currentSnake[0]) + direction
//Determine a move outcome/check collision,
window.interval = 0;
let Speed = 150;
let Score = 0;
let Scoreboard = document.getElementById("score");

const Start = document.getElementById("start");
const End = document.getElementById("end");

window.onload = () => {
  End.disabled = true;
};

End.onclick = () => {
  End.disabled = true;
  clearInterval(window.interval);
  Scoreboard.textContent = 0;
  Message("Game Over!");
};

Start.onclick = () => {
  StartGame();
};

const StartGame = () => {
  clearInterval(window.interval);

  Grid.Reset();
  Grid.Create();
  Message("");

  Start.disabled = true;
  End.disabled = false;
  Scoreboard.textContent = 0;

  Snake.Input();
  Snake.Spawn();
  Target.Spawn();

  window.interval = window.setInterval(Snake.Move, Speed);
};

const Grid = {
  grid: document.querySelector(".grid"),
  width: 25,
  area: 625,
  cells: [],

  Create: function () {
    Grid.cells = [];
    for (let i = 0; i < Grid.area; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("class", "cell");
      Grid.grid.appendChild(cell);
    }
    Grid.cells = document.querySelectorAll(".cell");
  },

  Reset: function () {
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";
  },
};

const Snake = {
  position: [],
  direction: 1,

  Spawn: function () {
    Snake.direction = 1;
    Snake.position = [2, 1, 0];
    Snake.position.forEach((index) => {
      Grid.cells[index].classList.add("snake");
    });
  },

  Input: function () {
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      switch (key) {
        case "ArrowLeft":
          if (Snake.direction !== 1) {
            Snake.direction = -1;
          }
          break;
        case "ArrowRight":
          if (Snake.direction !== -1) {
            Snake.direction = 1;
          }

          break;
        case "ArrowUp":
          if (Snake.direction !== Grid.width) {
            Snake.direction = -Grid.width;
          }
          break;
        case "ArrowDown":
          if (Snake.direction !== -Grid.width) {
            Snake.direction = Grid.width;
          }
          break;
      }
    });
  },

  Move: function () {
    let direction = Snake.direction;
    let position = Snake.position;

    if (
      Snake.Collison(Snake.position, Snake.direction, Grid.width, Grid.area) ===
      "collision"
    ) {
      return;
    }

    const tail = position.pop();

    Grid.cells[tail].classList.remove("snake");
    position.unshift(position[0] + direction);
    Grid.cells[position[0]].classList.add("snake");
    Snake.position = position;

    Snake.Eat(position, tail);
  },

  Collison: function (position, direction, width, area) {
    if (
      (position[0] % width === width - 1 && direction === 1) ||
      (position[0] % width === 0 && direction === -1) ||
      (position[0] + width >= area && direction === width) ||
      (position[0] - width < 0 && direction === -width) ||
      Grid.cells[position[0] + direction].classList.contains("snake")
    ) {
      clearInterval(window.interval);
      End.disabled = true;
      Message("You lose!");

      return "collision";
    }
  },

  Eat: function (position, tail) {
    if (Grid.cells[position[0]].classList.contains("target")) {
      position.push(tail);
      Grid.cells[tail].classList.add("snake");
      Grid.cells[position[0]].classList.remove("target");

      Target.Spawn();
      Speed -= 10;
      Score++;
      Scoreboard.textContent = Score;
    }
  },
};

const message = document.getElementById("message");
const Message = (text) => {
  message.textContent = text;
  Start.disabled = false;
};

const Randomize = () => {
  coordinate = Math.floor(Math.random() * 625);
  return coordinate;
};

const Target = {
  position: 0,

  Spawn: function () {
    let index = Randomize();
    const cells = Grid.cells;
    let block = cells[index];
    if (block.classList.contains("snake")) {
      index = Randomize();
      block = cells[index];
    }
    block.setAttribute("class", "target");

    Target.position = index;
  },
};
