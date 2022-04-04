let gameContainer = document.querySelector(".game_container");

let container_main = document.querySelector("#container_main");
let container_newGames_and_records = document.querySelector(".container_newGames_and_records");
let container_newGame = document.querySelector(".container_newGame");
let container_record_list = document.querySelector(".container_record_list");
let container_current_game_info = document.querySelector(".container_current_game_info");
let container_gameOver = document.querySelector(".container_gameOver");

let cloneCard = document.querySelector(".flip-card");
let newGame_input = document.querySelector(".newGame_input");
let current_game_popup = document.querySelector(".current_game_popup");
let gameInfo = document.querySelector(".gameInfo");
let popup_message = document.querySelector(".popup_message");
let popup_background_blocker = document.querySelector(".popup_background_blocker");



let hide = elem => elem.classList.add("hide");
let show = elem => elem.classList.remove("hide");

function startGame() {
   for (let i = 0; i < 16; i++) {
      let gameContainer_block = cloneCard.cloneNode(true)
      gameContainer_block.classList.remove("forClone");
      gameContainer.append(gameContainer_block);
   }
}

let menue_btn = document.getElementsByClassName("menue_btn")[0];

container_newGames_and_records.addEventListener("click", function (event) {
   if (event.target.innerText === "New Game") {
      hide(event.currentTarget);
      show(container_newGame);
      return;
   }
   if (event.target.innerText === "Records") {
      hide(event.currentTarget);
      show(container_record_list);
   }
});

container_newGame.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      newGame_input.value = "";
      hide(event.currentTarget);
      show(container_newGames_and_records);
      return;
   }
   if (event.target.innerText === "Start") {
      hide(event.currentTarget);
      show(container_current_game_info);
      startGame()
   }
})

container_record_list.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      hide(container_record_list);
      show(container_newGames_and_records)
   }
});

gameInfo.addEventListener("click", function (event) {
   if (event.target.innerText === "Restart") {
      popup_message.innerText = "Do you want to restart the game ?"
      show(popup_background_blocker);
      show(current_game_popup);
      return
   }
   if (event.target.innerText === "Menu") {
      popup_message.innerText = "Do you want to leave the game ?"
      show(popup_background_blocker);
      show(current_game_popup);
   }
})

current_game_popup.addEventListener("click", function (event) {
   if (event.target.innerText === "Cancel") {
      hide(event.currentTarget);
      hide(popup_background_blocker);

      return;
   }
   if (event.target.innerText === "Yes") {
      hide(event.currentTarget);
      hide(popup_background_blocker);
      return;
   }
})
