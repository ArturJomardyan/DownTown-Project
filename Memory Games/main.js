let container_main = document.querySelector("#container_main");
let container_start = document.querySelector(".container_start");
let container_name = document.querySelector(".container_name");
let container_records = document.querySelector(".container_records");
let container_game = document.querySelector(".container_game");
let container_endGame = document.querySelector(".container_endGame");

let table = document.querySelector("table");
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
let gameName = document.querySelector(".gameName");
let tBody = document.querySelector("tBody");
let time = document.querySelector(".time");
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

function setCurrentGameInfo(obj = {}) {
   localStorage.setItem("Current Game Info", JSON.stringify(obj));
}

function getCurrentGameInfo() {
   return JSON.parse(localStorage.getItem("Current Game Info")) || {};
}

function setRecordsList(obj = {}) {
   localStorage.setItem("Records List", JSON.stringify(obj));
};

function getRecordsList() {
   return JSON.parse(localStorage.getItem("Records List")) || {};
}

let hide = (...elem) => elem.forEach(el => el.classList.add("hide"))
let show = (...elem) => elem.forEach(el => el.classList.remove("hide"))


let list = getRecordsList();

if (Object.keys(list).length === 0) {
   list.recordsList = [];
   list.lastGame = {};
   list.previousGame = {};
   setRecordsList(list);
}

let hr = 0;
let min = 0;
let sec = 0;

let stoptime = false;

function timerCycle() {
   if (!stoptime) {

      sec = Number(sec);
      min = Number(min);
      hr = Number(hr);

      sec = sec + 1

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

function startTimer() {
   stoptime = false;
   setTimeout(() => timerCycle(), 1000); // first second
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


function drawRecordsList() {
   let list = getRecordsList();

   if (tBody.children.length > 1) {
      let trCollection = tBody.querySelectorAll("tr");
      for (let i = 1; i < trCollection.length; i++) {
         const element = trCollection[i];
         element.remove();
      }
   }

   if (list.recordsList.length === 0) {
      let row = `<tr><td colspan="3">no results yet</td></tr>`
      table.tBodies[0].insertAdjacentHTML("beforeend", row);
   } else {
      list.recordsList.forEach(el => {
         let row = `<tr>
         <td>${el.name}</td>
         <td>${el.time}</td>
         <td>${el.id}</td>
       </td>`
         table.tBodies[0].insertAdjacentHTML("beforeend", row);
      });
      let footer = `<tr><td colspan="3">Last Game</td></tr>
      <tr>
         <td>${list.lastGame.name}</td>
         <td>${list.lastGame.time}</td>
         <td>${list.lastGame.id}</td>
       </td>`
      table.tBodies[0].insertAdjacentHTML("beforeend", footer);
   }
}


function renderByStatus() {
   const currentPageStatus = getStatus();
   const allContainerArr = [
      container_start,
      container_records,
      container_name,
      container_game,
      container_endGame
   ]

   allContainerArr.forEach(el => {
      if (el.className.includes(currentPageStatus)) {
         el.classList.remove("hide");
      } else {
         let resualt = el.className.includes("hide");
         if (!resualt) el.classList.add("hide");
      }
   })
   if (currentPageStatus === "container_records") {
      drawRecordsList();
      return
   };
   if (currentPageStatus === "container_endGame") {
      gameOver_info(container_endGame);
      return
   };
}

renderByStatus();


let arrIndexImg = [];

function getRandomNum() {
   if (arrIndexImg.length === 16) arrIndexImg.length = 0;
   //image count = 8, generate random num in range 1-8 (including min-max) --
   // -- for give each image no more two time
   let random_num = Math.floor(1 + Math.random() * 8);
   if (!arrIndexImg.length) {
      arrIndexImg.push(random_num);
      return random_num
   }
   debugger;
   let count = arrIndexImg.filter(num => num === random_num).length < 2;
   if (count) {
      arrIndexImg.push(random_num);
      return random_num
   }
   return getRandomNum();
}


container_start.addEventListener("click", function (event) {
   if (event.target.innerText === "New Game") {
      setStatus("container_name")
      renderByStatus()
      return;
   };
   if (event.target.innerText === "Records") {
      setStatus("container_records");
      renderByStatus();
   };
});

newGame_input.setAttribute("maxlength", "20");

// delete validation message if it`s exist
newGame_input.addEventListener("input", function () {
   if (this.length !== 0) {
      this.nextElementSibling?.remove()
   }
});


container_name.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      newGame_input.value = "";
      setStatus("container_start");
      renderByStatus();
      return;
   }
   if (event.target.innerText === "Start") {
      if (newGame_input.value === "") {
         // check if exist validation message or not yet,if not then add
         if (this.children[0].children.length !== 3) {
            let message = "Please Enter The Name"
            let where = "afterend"
            let elem = `<span class="validationMessage">${message}</span>`
            newGame_input.insertAdjacentHTML(where, elem);
         };
      } else {
         player.innerText = newGame_input.value
         newGame_input.value = "";
         popup_cancel_btn.innerText = "Back";
         current_game_popup.dataset.openBtnName = "Start"
         setStatus("container_game");
         renderByStatus();
         startGame();
      }
   }
})


container_records.addEventListener("click", function (event) {
   if (event.target.innerText === "Menu") {
      setStatus("container_start");
      renderByStatus();
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


container_endGame.addEventListener("click", function (event) {
   if (event.target.innerText === "Restart") {
      let info = getCurrentGameInfo();
      let name = info.playerInfo.name
      startGame();
      info = getCurrentGameInfo();
      info.playerInfo.name = name
      setCurrentGameInfo(info);
      setStatus("container_game");
      renderByStatus();
      return
   }
   if (event.target.innerText === "Menu") {
      setStatus("container_start");
      renderByStatus();
   }
})


function startGame() {
   popup_message.innerText = "Are You Ready ?"
   show(popup_background_blocker, current_game_popup);

   let current_game_info = getCurrentGameInfo();

   current_game_info["playerInfo"] = {
      name: player.innerText,
      time: "", // for get current duration game when relod page
      id: String(+new Date()).substring(7), // just generate random 6 digit game id form last part of new Date
      message: ""
   };

   let list = getRecordsList();
   list.previousGame = list.lastGame;
   list.lastGame = current_game_info["playerInfo"];
   setRecordsList(list);

   current_game_info["openedBlock"] = [];   // get opened couple block id for not lose it when reload page,
   current_game_info["block_image"] = {};   // get images num thats should be inside each block 

   //remove previous game bloks

   let divCollection = gameContainer.querySelectorAll(".flip-card");
   if (divCollection.length) divCollection.forEach(el => el.remove());

   // fill 16 block and set an id for each block so that when you
   // click on it you know which picture should be placed from current_game_info

   for (let i = 0; i < 16; i++) {
      let gameContainer_block = cloneCard.cloneNode(true);
      gameContainer_block.classList.remove("forClone");
      gameContainer_block.classList.remove("hide");
      gameContainer_block.dataset.id = i + 1;
      gameContainer.append(gameContainer_block);

      let imgIndex = getRandomNum();
      current_game_info["block_image"][i + 1] = imgIndex;
   }
   setCurrentGameInfo(current_game_info);
}


gameContainer.addEventListener("click", function (event) {
   let current_game_info = getCurrentGameInfo();

   if (event.target.className.includes("flip-card-front")) {

      event.target.parentElement.style.transform = "rotateY(180deg)";
      event.target.parentElement.parentElement.style.transform = "rotateY(180deg)";
      let blockID = event.target.parentElement.parentElement.dataset.id;

      event.target.nextElementSibling.style.backgroundImage = `url('images/img_${current_game_info["block_image"][blockID]}.png')`;

      let currentOpenedBlock = {
         block_child_Index: Number(blockID),
         img_index: current_game_info["block_image"][blockID]
      }

      current_game_info.openedBlock.push(currentOpenedBlock);

      if (current_game_info.openedBlock.length % 2 === 0) {

         if (current_game_info.openedBlock.at(-1).img_index !== current_game_info.openedBlock.at(-2).img_index) {

            show(popup_background_blocker); // cant't click others block when two bloks are open 

            let indexForRotateBack_1 = current_game_info.openedBlock.at(-1).block_child_Index
            let indexForRotateBack_2 = current_game_info.openedBlock.at(-2).block_child_Index

            setTimeout(() => {
               gameContainer.children[indexForRotateBack_1].style.transform = null;
               gameContainer.children[indexForRotateBack_1].children[0].style.transform = null;

               gameContainer.children[indexForRotateBack_2].style.transform = null;
               gameContainer.children[indexForRotateBack_2].children[0].style.transform = null;

               hide(popup_background_blocker); // make all bloks clickable after closing previous two bloks
            }, 500); // back rotate blocks in case when two image is not same:

            setTimeout(() => {
               gameContainer.children[indexForRotateBack_1].children[0].children[1].style.backgroundImage = null
               gameContainer.children[indexForRotateBack_2].children[0].children[1].style.backgroundImage = null
            }, 600); // image should deleted 1 second later: in order to user can`t see delating moment:

            current_game_info.openedBlock.splice(-2, 2);

         } else {
            show(popup_background_blocker); // cant't click others block when two bloks are open 
            setTimeout(() => hide(popup_background_blocker), 500);  // make all bloks clickable after closing previous two bloks
            if (current_game_info.openedBlock.length === 16) {
               stoptime = true; // stop woriking time until reset will be called one second later
               setTimeout(() => {
                  setStatus("container_endGame");
                  renderByStatus();
                  resetTimer();
               }, 1000);

               let checkPlace = ""

               let list = getRecordsList();
               list.lastGame.time = time.innerText;
               list.recordsList.push(list.lastGame);

               let arrRecordsList = list.recordsList;

               if (arrRecordsList.length === 1) {
                  current_game_info.playerInfo.message = `You took 1-st place`
               } else {
                  arrRecordsList = arrRecordsList.sort((a, b) => {
                     a = get_milliseconde_from_time(a.time);
                     b = get_milliseconde_from_time(b.time);
                     return a - b
                  });

                  // find last game place in list

                  arrRecordsList.forEach((el, index) => {
                     a = get_milliseconde_from_time(el.time);
                     b = get_milliseconde_from_time(list.lastGame.time);
                     if (a === b) checkPlace = index;
                  });

                  if (checkPlace < 5) {
                     current_game_info.playerInfo.message = `You took ${checkPlace + 1}-st place`
                  } else {
                     current_game_info.playerInfo.message = `Result is Out of Top 5`
                  }

                  if (arrRecordsList.length > 5) {
                     arrRecordsList.pop();
                  }
               }

               setRecordsList(list);

               let gameDuration = get_time_from_milliseconde(+new Date() - current_game_info.playerInfo.time);
               gameDuration = gameDuration.split(".")[0]; // cut milliseconds 
               current_game_info.playerInfo.time = gameDuration

               setCurrentGameInfo(current_game_info);
               gameOver_info(container_endGame);
            }
         }
      }
      setCurrentGameInfo(current_game_info); 
   }
});

function gameOver_info(container) {
   let current_game_info = getCurrentGameInfo()
   container.children[1].innerText = current_game_info.playerInfo.name;
   container.children[2].innerText = current_game_info.playerInfo.time;
   container.children[3].innerText = current_game_info.playerInfo.message;
}

function get_time_from_milliseconde(num) {
   let time = ""
   num = num / 1000
   if (num > 3599) {
      let hour = Math.trunc(String(num / 3600));
      if (hour < 10) {
         hour = "0" + hour;
      }
      let min = num % 3600;
      min = get_time_from_milliseconde(min * 1000);
      min = min.split(":").splice(1).join(":");
      time = hour + ":" + min
      return time
   } else if (num > 59 && num < 3600) {
      let min = Math.trunc(String(num / 60));
      let sec = num % 60;
      sec = Math.ceil(sec);
      if (min < 10 && sec < 10) {
         time = "00:0" + min + ":0" + sec;
         return time
      }
      if (min < 10 && sec > 9) {
         time = "00:0" + min + ":" + sec;
         return time
      }
      if (min > 9 && sec < 10) {
         time = "00:" + min + ":0" + sec;
         return time
      }
      if (min > 9 && sec > 9) {
         time = "00:" + min + ":" + sec;
         return time
      }
   } else {
      if (num < 10) {
         time = "00:00:0" + num;
         return time
      }
      if (num > 10 && num < 60) {
         time = "00:00:" + num;
         return time
      }
   }
}


function get_milliseconde_from_time(time) {
   let [hr, min, sec] = time.split(":");

   let hr_mill = Number(hr) * 3600000;
   let min_mill = Number(min) * 60000;
   let sec_mill = Number(sec) * 1000;

   let convert_time_mill = hr_mill + min_mill + sec_mill

   return convert_time_mill
}


current_game_popup.addEventListener("click", function (event) {
   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Start") {
      hide(event.currentTarget, popup_background_blocker);
      let player = getCurrentGameInfo()
      player.playerInfo.time = +new Date();
      setCurrentGameInfo(player);
      startTimer();
      return;
   }

   if (event.target.innerText === "Back" && current_game_popup.dataset.openBtnName === "Start") {
      hide(event.currentTarget, popup_background_blocker);
      setStatus("container_name");
      renderByStatus();
      return;
   }

   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Restart") {
      hide(event.currentTarget, popup_background_blocker);
      current_game_popup.dataset.openBtnName = "Start";
      resetTimer();
      // get and after set current player name so the name should not change after the restart
      let info = getCurrentGameInfo();
      let name = info.playerInfo.name
      show(popup_background_blocker)
      setTimeout(() => {
         startGame();
      }, 400);
      info = getCurrentGameInfo();
      info.playerInfo.name = name
      setCurrentGameInfo(info);
      return;
   }

   if (event.target.innerText === "Cancel" && current_game_popup.dataset.openBtnName === "Restart") {
      hide(event.currentTarget, popup_background_blocker);
      return;
   }

   if (event.target.innerText === "Yes" && current_game_popup.dataset.openBtnName === "Menu") {
      hide(event.currentTarget, popup_background_blocker);
      let list = getRecordsList();
      list.lastGame = list.previousGame;
      setRecordsList(list);
      resetTimer();
      setStatus("container_start");
      renderByStatus();
      return;
   }

   if (event.target.innerText === "Cancel" && current_game_popup.dataset.openBtnName === "Menu") {
      hide(event.currentTarget, popup_background_blocker);
   }
});



