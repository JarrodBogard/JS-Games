const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.getElementById("time-left")
const score = document.getElementById("score")
let resultDisplay = document.getElementById("result-display")
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")

// startButton.addEventListener("click", () => {
//     moveMole()
// }, {once: true})

// stopButton.addEventListener("click", () => {
//     timerId = null
// })

let result = 0
let hitPosition
let currentTime = 60
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("mole")
    })

    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add("mole")

    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if(square.id == hitPosition) {
            result ++
            score.innerText = result
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 500)
}
moveMole()

function countDown() {
    currentTime--
    timeLeft.innerHTML = currentTime

    if(currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        resultDisplay.innerHTML = `Game Over! You're final score is: ${result}`
    }
}

let countDownTimerId = setInterval(countDown, 1000)