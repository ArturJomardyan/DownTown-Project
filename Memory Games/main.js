let gameContainer = document.getElementsByClassName("game_container")[0];
let cloneCard = document.getElementsByClassName("flip-card");
console.log(cloneCard)
for (let i = 0; i < 16; i++) {
   let gameContainer_block = cloneCard[0].cloneNode(true)
   gameContainer_block.classList.remove("forClone");
   gameContainer.append(gameContainer_block);
}