let gameContainer = document.getElementsByClassName("game_container")[0];
let cloneCard = document.getElementsByClassName("flip-card");

let container_main = document.querySelector("#container_main");
let container_newGames_and_records = document.querySelector(".container_newGames_and_records");
let container_newGame = document.querySelector(".container_newGame");
let container_record_list = document.querySelector(".container_record_list");
let container_current_game_info = document.querySelector(".container_current_game_info");
let container_gameOver = document.querySelector(".container_gameOver");

let newGame_input = document.querySelector(".newGame_input");


let hide = elem => elem.classList.add("hide");
let show = elem => elem.classList.remove("hide");

function startGame() {
   for (let i = 0; i < 16; i++) {
      let gameContainer_block = cloneCard[0].cloneNode(true)
      gameContainer_block.classList.remove("forClone");
      gameContainer.append(gameContainer_block);
   }
}

let menue_btn = document.getElementsByClassName("menue_btn")[0];

container_record_list.addEventListener("click", function(event){
   if(event.target.innerText === "Menu"){
      hide(container_record_list);
      show(container_newGames_and_records)
   }
});

container_newGame.addEventListener("click",function(event){
   if(event.target.innerText === "Menu"){
      newGame_input.value = "";
      hide(event.currentTarget);
      show(container_newGames_and_records);
      return;
   }
   if(event.target.innerText === "Start"){
      hide(event.currentTarget);
      show(container_current_game_info);
      startGame()
   }
})

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
})
