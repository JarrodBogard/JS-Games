const computerChoiceDisplay = document.getElementById("computer-choice")
const userChoiceDisplay = document.getElementById("user-choice")
const resultDisplay = document.getElementById("result")

const possibleChoices = document.querySelectorAll("button")
let userChoice
let computerChoice
let result

possibleChoices.forEach(possChoice => possChoice.addEventListener("click", e => {
    userChoice = e.target.id
    userChoiceDisplay.innerText = userChoice
    generateComputerChoice()
    getResult()
}))

const generateComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1
    console.log(randomNumber)

    if(randomNumber === 1) {
        computerChoice = "rock"
    }
    if(randomNumber === 2) {
        computerChoice = "paper"
    }
    if(randomNumber === 3) {
        computerChoice = "scissors"
    }

    computerChoiceDisplay.innerText = computerChoice
}

const getResult = () => {
    if(computerChoice === userChoice) {
        result = "it's a draw"
    }

    if( computerChoice === "rock" && userChoice === "paper") {
        result = "you win!"
    }
    if( computerChoice === "paper" && userChoice === "scissors") {
        result = "you win!"
    }
    if( computerChoice === "scissors" && userChoice === "rock") {
        result = "you win!"
    }
    if( computerChoice === "paper" && userChoice === "rock") {
        result = "you lose..."
    }
    if( computerChoice === "scissors" && userChoice === "paper") {
        result = "you lose..."
    }
    if( computerChoice === "rock" && userChoice === "scissors") {
        result = "you lose..."
    }

    resultDisplay.innerText = result
}