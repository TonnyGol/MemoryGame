var cards = []
var firstCard, secondCard
var cardsFound = 0
var lockBoard = false
var nameInput = document.getElementById("name")
var cardCountInput = document.getElementById("cardCount")
var startGameButton = document.getElementById("startButton")
var gameBoard = document.getElementById("gameBoard")
var restartButton

fetch("cards.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data]
    })
//----------------------------------------------------------------
function inputsChange() {
    if (nameInput.value.trim() != "" && cardCountInput.value.trim() != ""
        && (cardCountInput.value >= 2 && cardCountInput.value <= 30)) {
        startGameButton.disabled = false;
    } else {
        startGameButton.disabled = true;
    }
}
//----------------------------------------------------------------
function redirect() {
    hide(document.getElementById("startPage"));
    document.body.style.backgroundImage = "url('assets/images/wood table.jpg')"

    var cardsCount = cardCountInput.value
    var tempCards = cards
    tempCards.length = cardsCount

    var playerName = document.getElementById("playerName")
    playerName.innerText = "Player name: " + nameInput.value

    shuffleCards()
    generateCards(parseInt(tempCards))
    shuffleCards()
    generateCards(parseInt(tempCards))
    startTimer();

    var restart = document.getElementById("restart")
    restart.innerHTML = `
        <button type="button" id="restartButton" onclick="restart()" class="btn btn-primary"
                disabled>Restart</button>
                `
    restartButton = document.getElementById("restartButton")
}
//----------------------------------------------------------------
function hide(elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'none';
    }
}
//----------------------------------------------------------------
function shuffleCards() {
    var currentIndex = cards.length
    var randomIndex
    var temporaryValue

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
}
//----------------------------------------------------------------
function generateCards(cardCount) {
    var stopIndex = 0

    for (var card of cards) {
        var cardElement = document.createElement("div")
        cardElement.classList.add("card")
        cardElement.id = "card"
        cardElement.setAttribute("data-name", card.name)
        cardElement.innerHTML = `
            <div class="front">
                <h1 class="front-text">${card.value}</h1>
            </div>
            <div class="back">
            </div>
        `
        cardElement.addEventListener("click", flipCard)
        gameBoard.appendChild(cardElement)
        if (stopIndex === cardCount * 2) {
            break
        } else {
            stopIndex++
        }
    }
}
//----------------------------------------------------------------
var seconds = 0;
var timeCounter = document.getElementById('seconds-counter');
var timer;

function startTimer() {
    timer = setInterval(incrementSeconds, 1000);
}
function incrementSeconds() {
    if (cardsFound.toString() === cardCountInput.value) {
        timeCounter.innerText = "You won in: " + seconds + " seconds"
        restartButton.disabled = false
    } else {
        seconds += 1;
        timeCounter.innerText = "Timer: " + seconds + " seconds"
    }
}
//----------------------------------------------------------------
function flipCard() {
    if (lockBoard) return
    if (this === firstCard) return

    this.classList.add("flipped")

    if (!firstCard) {
        firstCard = this
        return
    }

    secondCard = this
    lockBoard = true

    checkForMatch()
}

function checkForMatch() {
    var isMatch = firstCard.dataset.name === secondCard.dataset.name

    if (isMatch) {
        cardsFound++
    }

    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click", flipCard)

    resetBoard()
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped")
        secondCard.classList.remove("flipped")
        resetBoard()
    }, 1000)
}

function resetBoard() {
    firstCard = null
    secondCard = null
    lockBoard = false
}

function restart() {
    cardsFound = 0
    seconds = 0
    restartButton.disabled = true
    resetBoard()
    shuffleCards()
    gameBoard.innerHTML = ""
    generateCards(cardCountInput.value)
    shuffleCards()
    generateCards(cardCountInput.value)
}

