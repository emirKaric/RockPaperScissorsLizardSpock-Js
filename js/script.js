'use strict';

let userScore = 0;
let compScore = 0;
const choices = ["rock", "paper", "scissors", "lizard",  "spock"];
const getMiddleWord = {
    "rock": ["scissors", "crashes", "lizard", "crashes"],
    "lizard": ["spock", "poisons", "paper", "eats"],
    "spock": ["scissors", "smashes", "rock", "vaporizes"],
    "scissors": ["paper", "cuts", "lizard", "decapitates"],
    "paper": ["spock", "disproves", "rock", "covers"]
};

const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const lizard_div = document.getElementById("lizard");
const spock_div = document.getElementById("spock");


function getComputerChoice() {
    const compChoice = Math.floor(Math.random() * 5);
    return choices[compChoice];
}

function getMessage(winner, loser){
    let arrayWithWords = getMiddleWord[winner];
    let message = `${winner.charAt(0).toUpperCase() + winner.slice(1)} `; 
    if(arrayWithWords[0] == loser)
        return  `${message} ${arrayWithWords[1]} ${arrayWithWords[0]}.`;
    else
        return  `${message} ${arrayWithWords[3]} ${arrayWithWords[2]}.`;
}

function win(messageToUser) {
    userScore++;
    userScore_span.textContent = userScore;
    result_div.textContent = `${messageToUser} You win!!`;
}

function draw(choice) {
    let firstWord = choice.charAt(0).toUpperCase() + choice.slice(1);
    result_div.textContent = `${firstWord} equals ${choice}. Draw!!`;
}

function lose(messageToUser) {
    compScore++;
    compScore_span.textContent = compScore;
    result_div.textContent = `${messageToUser} You lost!!`;
}

function game(userChoice, compChoice = getComputerChoice()) {
    if(userChoice == compChoice){
         draw(userChoice);
         document.getElementById(userChoice).classList.add("gray-glow");
         setTimeout(() => {
            document.getElementById(userChoice).classList.remove("gray-glow");
        }, 300);
         return;
    }

    switch(userChoice + compChoice){
        case "rockscissors":
        case "rocklizard":
        case "lizardspock":
        case "lizardpaper":
        case "spockscissors":
        case "spockrock":
        case "scissorspaper":                    
        case "scissorslizard":
        case "paperrock":
        case "paperspock":
            win(getMessage(userChoice, compChoice));
            document.getElementById(userChoice).classList.add("green-glow");
            setTimeout(() => {
                document.getElementById(userChoice).classList.remove("green-glow");
            }, 300);
            break;
        default:
            lose(getMessage(compChoice, userChoice));
            document.getElementById(userChoice).classList.add("red-glow");
            setTimeout(() => {
                document.getElementById(userChoice).classList.remove("red-glow");
            }, 300);
    }
}

function main() {
    rock_div.addEventListener("click", () =>{
        game("rock");    
    });

    paper_div.addEventListener("click", () => {
        game("paper");  
    });

    scissors_div.addEventListener("click", () => {
        game("scissors"); 
    });

    lizard_div.addEventListener("click", () => {
        game("lizard"); 
    });

    spock_div.addEventListener("click", () => {
        game("spock"); 
    });
}

main();