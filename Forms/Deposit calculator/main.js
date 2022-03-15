let bet = document.querySelectorAll("[type='number']")[0];
let percent_per_year = document.querySelectorAll("[type='number']")[1];
let selectMonths = document.getElementsByName("months")[0];
let was = document.querySelectorAll("span")[0];
let become = document.querySelectorAll("span")[1];
let was_graph = document.getElementById("was_graph");


bet.oninput = calculate;
percent_per_year.oninput = calculate;
selectMonths.onchange = calculate;


function calculate() {
    let deposit = +bet.value;
    let prcent = +percent_per_year.value;
    let months = parseInt(selectMonths.value);
    let prcent_for_monts = prcent / 12
    let resualt = 0;
    for (let i = 0; i < months; i++) {
        resualt += deposit / 100 * prcent_for_monts
    }
    was.innerText = bet.value
    resualt = Math.round(resualt + deposit)
    become.innerText = resualt

    draw_graph(deposit, resualt);
}

calculate()


function draw_graph(become, was) {
    let diffrence = was / become;
    let defaultHeight = 200;
    let wasHeight = Math.round(defaultHeight / diffrence);
    was_graph.style.height = wasHeight + "px";
}