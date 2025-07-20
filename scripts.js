let gamebox = document.querySelectorAll(".gamebox");
let restartbtn = document.querySelector(".restartbtn");
let newgamebtn = document.querySelector(".newgamebtn");
let gamemessage = document.querySelector("#gamemessage");
let messagecontainer = document.querySelector(".messagecontainer");

let count = 0;
let player0 = true; // If true, it's O’s turn. If false, it's X’s turn.

let patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

gamebox.forEach(function (box) {
  box.addEventListener("click", function () {
    if (player0) {
      box.textContent = "0";
      player0 = false;
    } else {
      box.textContent = "x";
      player0 = true;
    }

    box.disabled = true;
    count++;

    let iswinner = checkWinner();

    if (count === 9 && !iswinner) {
      gamedraw();
    }
  });
});

function enableboxes() {
  for (let box of gamebox) {
    box.disabled = false;
    box.textContent = ""; 
  }
}

function disableboxes() {
  for (let box of gamebox) {
    box.disabled = true;
  }
}

function gamedraw() {
  gamemessage.textContent = "Game was draw! Start a new game.";
  messagecontainer.classList.remove("hide");
  disableboxes();
}

function showWinner(winner) {
  gamemessage.textContent = `Congratulations! Winner is ${winner}`;
  messagecontainer.classList.remove("hide");
  disableboxes();
}

function checkWinner() {
  for (let pattern of patterns) {
    let p1value = gamebox[pattern[0]].innerText;
    let p2value = gamebox[pattern[1]].innerText;
    let p3value = gamebox[pattern[2]].innerText;

    if (p1value !== "" && p2value !== "" && p3value !== "") {
      if (p1value === p2value && p2value === p3value) {
        showWinner(p1value);
        return true;
      }
    }
  }
  return false;
}

function reset() {
  count = 0;
  player0 = true;
  enableboxes();
  gamemessage.textContent = "";
  messagecontainer.classList.add("hide");
}

newgamebtn.addEventListener("click", reset);
restartbtn.addEventListener("click", reset);
