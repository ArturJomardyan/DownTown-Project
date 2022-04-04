let gameContainer = document.getElementsByClassName("game_container")[0];
let cloneCard = document.getElementsByClassName("flip-card");

function startGame() {
   for (let i = 0; i < 16; i++) {
      let gameContainer_block = cloneCard[0].cloneNode(true)
      gameContainer_block.classList.remove("forClone");
      gameContainer.append(gameContainer_block);
   }
}

let ccontainer_newGames_and_records = document.getElementById("container_newGames_and_records");
let container_newGame = document.getElementById("container_newGame");
let container_record_list = document.getElementById("container_record_list");
let menue_btn = document.getElementsByClassName("menue_btn")[0];

menue_btn.addEventListener("click", function(event){

   if(event.target.parentElement.tagName = "TABLE"){
      event.target.parentElement.previousElementSibling.setAttribute("hidden","true");
      event.target.parentElement.setAttribute("hidden","true");
      ccontainer_newGames_and_records.setAttribute("hidden","false");
   }
 
});

container_newGames_and_records.addEventListener("click", function (event) {
   if (event.target.innerText === "New Game") {
      event.currentTarget.hidden = "true";
      container_newGame.hidden = "false";
      return;
   }
   if (event.target.innerText === "Records") {
      event.currentTarget.hidden = "true";
      container_record_list.hidden = "false";
   }
})
