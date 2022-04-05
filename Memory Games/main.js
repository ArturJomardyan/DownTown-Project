let container_main = document.querySelector("#container_main");
let container_start = document.querySelector(".container_start");
let container_name = document.querySelector(".container_name");
let container_records = document.querySelector(".container_records");
let container_game = document.querySelector(".container_game");
let container_endGame = document.querySelector(".container_endGame");

let gameContainer = document.querySelector(".game_container");
let cloneCard = document.querySelector(".forClone");
let newGame_input = document.querySelector(".newGame_input");
let current_game_popup = document.querySelector(".current_game_popup");
let gameInfo = document.querySelector(".gameInfo");
let popup_message = document.querySelector(".popup_message");
let popup_background_blocker = document.querySelector(".popup_background_blocker");
let menue_btn = document.querySelector(".menue_btn");
let popup_cancel_btn = document.querySelector(".popup_cancel_btn");
let currentPlayerName = document.querySelector(".currentPlayerName");
// let flip_card_inner = document.querySelector(".flip-card-inner");
let player = document.querySelector(".player");
let houre = document.querySelector(".hh");
let minute = document.querySelector(".mm");
let second = document.querySelector(".ss");

function setStatus(status = "") {
   localStorage.setItem("currentPage", status);
}

function getStatus() {
   return localStorage.getItem("currentPage") || "container_start";
}

let hide = (...elem) => elem.forEach(el => el.classList.add("hide"))
let show = (...elem) => elem.forEach(el => el.classList.remove("hide"))

function renderByStatus(currentPage = "") {
   const currentPageStatus = getStatus();
   const allContainerArr = [
      container_start,
      container_records,
      container_name,
      container_game,
      container_endGame
   ]

   allContainerArr.forEach(el => {
      let resualt = el.className.includes(currentPageStatus);
      if (resualt) el.classList.remove("hide");
      if (currentPage) {
         let resualt = el.className.includes(currentPage);
         if (resualt) el.classList.add("hide");
      }
   })

}

renderByStatus();

let arrIndexImg = [];

function getRandomNum() {
   //image count = 8, generate random num in range 1-8 (including min-max) --
   // -- for give each image no more two time
   let random_num = Math.floor(1 + Math.random() * 8);
   if (!arrIndexImg.length) {
      arrIndexImg.push(random_num);
      return random_num
   }
   let count = arrIndexImg.filter(num => num === random_num).length < 2;
   if (count) {
      arrIndexImg.push(random_num);
      return random_num
   }
   return getRandomNum();
}

function startGame() {
   popup_message.innerText = "Are You Ready ?"
   setTimeout(() => show(popup_background_blocker, current_game_popup), 300);
   for (let i = 0; i < 16; i++) {
      let gameContainer_block = cloneCard.cloneNode(true);
      gameContainer_block.classList.remove("forClone");
      gameContainer_block.classList.remove("hide");
      let imgIndex = getRandomNum();
      gameContainer_block.children[0].children[1].style.backgroundImage = `url('images/img_${imgIndex}.png')`;
      gameContainer.append(gameContainer_block);
   }
}

container_start.addEventListener("click", function (event) {
   if (event.target.innerText === "New Game") {
      setStatus("container_name")
      renderByStatus("container_start")
      return;
   }
   if (event.target.innerText === "Records") {
      setStatus("container_records");
      debugger;
      renderByStatus("container_start");
   }
});

newGame_input.setAttribute("maxlength", "15");

container_name.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      newGame_input.value = "";
      setStatus("container_start");
      renderByStatus("container_name");
      return;
   }
   if (event.target.innerText === "Start") {
      if(newGame_input.value === ""){
         const span = document.createElement("span");
         span.classList.add("validationMessage")
         newGame_input.insertAdjacentText("afterend","sasasas")
      }else{
         player.innerText = newGame_input.value
         newGame_input.value = "";
         popup_cancel_btn.innerText = "Back";
         current_game_popup.dataset.openBtnName = "Start"
         setStatus("container_game");
         renderByStatus("container_name");
         startGame();
      }
   }
})

container_records.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      setStatus("container_start");
      renderByStatus("container_records");
   }
});

gameInfo.addEventListener("click", function (event) {
   if (event.target.innerText === "Restart") {
      popup_cancel_btn.innerText = "Cancel"
      current_game_popup.dataset.openBtnName = "Restart"
      popup_message.innerText = "Do you want to restart the game ?"
      show(popup_background_blocker, current_game_popup);
      return
   }
   if (event.target.innerText === "Menu") {
      popup_cancel_btn.innerText = "Cancel"
      current_game_popup.dataset.openBtnName = "Menu"
      popup_message.innerText = "Do you want to leave the game ?"
      show(popup_background_blocker, current_game_popup);
   }
})

container_game.addEventListener("click", function (event) {

})

current_game_popup.addEventListener("click", function (event) {

   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Start") {
      hide(event.currentTarget, popup_background_blocker);
      timerCycle()
      return;
   }

   if (event.target.innerText === "Back" && current_game_popup.dataset.openBtnName === "Start") {
      hide(event.currentTarget, popup_background_blocker);
      setStatus("container_name");
      renderByStatus("container_game");
      return;
   }

   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Restart") {
      hide(event.currentTarget, popup_background_blocker);
      resetTimer()
      return;
   }

   if (event.target.innerText === "Cancel" && current_game_popup.dataset.openBtnName === "Restart") {
      hide(event.currentTarget, popup_background_blocker);
      return;
   }

   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Menu") {
      hide(event.currentTarget, popup_background_blocker);
      setStatus("container_start");
      renderByStatus("container_game");
      return;
   }

   if (event.target.innerText === "Cancel" && current_game_popup.dataset.openBtnName === "Menu") {
      hide(event.currentTarget, popup_background_blocker);
   }

})

var hr = 0;
var min = 0;
var sec = 0;

let stoptime = true;


function timerCycle() {

   stoptime = false;

   if (!stoptime) {
      sec = Number(sec);
      min = Number(min);
      hr = Number(hr);

      sec = sec + 1;

      if (sec == 60) {
         min = min + 1;
         sec = 0;
      }
      if (min == 60) {
         hr = hr + 1;
         min = 0;
         sec = 0;
      }
      if (sec < 10 || sec == 0) {
         sec = '0' + sec;
         second.innerHTML = sec
      }
      second.innerHTML = sec

      if (min < 10 || min == 0) {
         min = '0' + min;
         minute.innerHTML = min
      }
      minute.innerHTML = min

      if (hr < 10 || hr == 0) {
         hr = '0' + hr;
         houre.innerHTML = hr
      }
      houre.innerHTML = hr

      setTimeout("timerCycle()", 1000);
   }

}

function resetTimer() {
   stoptime = true;
   houre.innerText = "00"
   minute.innerText = "00"
   second.innerText = "00"
   hr = 0;
   sec = 0;
   min = 0;
}

