console.clear()

const cardArray = [
    {
        name: "fries",
        img: "images/fries.png"   
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"   
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"   
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"   
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"   
    },
    {
        name: "pizza",
        img: "images/pizza.png"   
    },
    {
        name: "fries",
        img: "images/fries.png"   
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"   
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"   
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"   
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"   
    },
    {
        name: "pizza",
        img: "images/pizza.png"   
    }
]

cardArray.sort(() => .5 - Math.random())

const gridDisplay = document.querySelector("#grid")
const resultDisplay = document.querySelector("#result")
let cardsChosen = []
let cardsChosenID = []
let cardsWon = []

////////////////////////////////////////////////////////

// const flipCard = () => {
//     const cardID = this.getAttribute("data-id")
//     console.log("clicked", cardID)
// } 
// why not working with arrow function??? //


const createBoard = () => {
    for(let i = 0; i < cardArray.length; i++) {
        const card = document.createElement("img")
        card.setAttribute("src", "images/blank.png")
        card.setAttribute("data-id", i)
        card.addEventListener("click", flipCard) //, {once: true}) how to make this work so you can only click each card once during a turn
        gridDisplay.appendChild(card)
        // console.log(card, i)
    }
}
createBoard()

const checkMatch = () => {
    const cards = document.querySelectorAll("#grid img")
    const optionOneID = cardsChosenID[0]
    const optionTwoID = cardsChosenID[1]
    console.log(cardsChosen, "cardsChosen Array")
    console.log(cardsChosenID, "cardsChosenID Array")
    console.log(optionOneID, "optionOneID")
    console.log(optionTwoID, "optionTwoID")
    console.log(cards, "cards")
    if(optionOneID === optionTwoID) {
        alert("You Have Clicked the Same Image") 
        cards[optionOneID].setAttribute("src", "images/blank.png")
        cards[optionTwoID].setAttribute("src", "images/blank.png")
        cardsChosen = []
        cardsChosenID = []
        return    
        // cards.addEventListener("click", flipCard)
    }
    if(cardsChosen[0] === cardsChosen[1]) {
        alert("You Found a Match!")
        cards[optionOneID].setAttribute("src", "images/white.png")
        cards[optionTwoID].setAttribute("src", "images/white.png")
        cards[optionOneID].removeEventListener("click", flipCard)
        cards[optionTwoID].removeEventListener("click", flipCard)
        cardsWon.push(cardsChosen)
        console.log(cardsWon, cardsWon.length)
        
    } else {
        cards[optionOneID].setAttribute("src", "images/blank.png")
        cards[optionTwoID].setAttribute("src", "images/blank.png")
        // alert("Sorry, Try Again.")
    }
    // if(cards[optionOneID])
    // cards[optionOneID].addEventListener("click", flipCard, {once: true})   
    // cards[optionTwoID].addEventListener("click", flipCard, {once: true})
    cardsChosen = []
    cardsChosenID = []
    resultDisplay.innerText = cardsWon.length

    if(cardsWon.length === cardArray.length / 2) {
        resultDisplay.innerText = "Congrats You Found All the Pairs!"
    }
}

function flipCard() {
    const cardID = this.getAttribute("data-id")
    cardsChosen.push(cardArray[cardID].name)
    cardsChosenID.push(cardID)
    console.log(cardsChosen, cardsChosenID)
    this.setAttribute("src", cardArray[cardID].img)
    if(cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}
