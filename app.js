"use-strict";

//Create a snake and block div
//Make each random on new game
//Control snake with arrow keys
//Control snake movement with timeout() and current direction
let Snake = {
  xPosition: null,
  yPosition: null,
  direction: null,
  length: 0,

  position: function (x, y) {
    const column = x;
    const row = y;
    const block = document.createElement("div");
    const window = document.getElementById("game-window");
    block.setAttribute("id", "snake");
    block.style.gridArea = `${column} / ${row}`;
    window.appendChild(block);

    this.xPosition = column;
    this.yPosition = row;
  },

  move: function () {
    document.addEventListener("keydown", (e) => {
      const key = e.key;
      console.log(key);
      switch (key) {
        case "ArrowLeft":
            this.yPosition--
            this.position(this.yPosition, this.xPosition);
            console.log("Left");
          break;
        case "ArrowRight":
          break;
        case "ArrowUp":
          break;
        case "ArrowDown":
          break;
      }
    });
  },
};

window.onload = () => {
    Snake.position(13, 13);
}
