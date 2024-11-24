var seconds = 0;
var el = document.getElementById('seconds-counter');
var cancel;

const card = document.getElementById("card");

card?.addEventListener("click", flipCard);


function inputsChange() {
    var nameInput = document.getElementById("name")
    var cardCountInput = document.getElementById("cardCount")
    var startGameButton = document.getElementById("startButton")

    if (nameInput.value.trim() != "" && cardCountInput.value.trim() != "") {
        startGameButton.disabled = false;
    } else {
        startGameButton.disabled = true;
    }
}


function redirect() {
    hide(document.getElementById("startPage"));
    document.body.style.backgroundImage = "url('assets/images/wood table.jpg')"

    var cardCountInput = document.getElementById("cardCount")
    generateCards(parseInt(cardCountInput.value))

}

function hide(elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
        elements[index].style.display = 'none';
    }
}

function generateCards(cardCount) {

    var gameBoard = document.getElementById("gameBoard");
    startTimer();

    for (counter = 1; counter <= cardCount * 2; counter++) {
        var divContainer = document.createElement("div")
        divContainer.classList.add("card-container")
        var divCard = document.createElement("div")
        divCard.classList.add("card")
        divCard.id = "card"
        var divFront = document.createElement("div")
        divFront.classList.add("card-front")
        var backOfCard = document.createElement("img")
        backOfCard.src = "assets/images/heartStone card.jpg"
        backOfCard.alt = "Front Image"
        divFront.appendChild(backOfCard)
        var divBack = document.createElement("div")
        divBack.classList.add("card-back")
        var frontOfCard = document.createElement("img")
        //frontcard.src = ""
        frontOfCard.alt = "Back Image"
        divCard.appendChild(divFront)
        divCard.appendChild(divBack)
        divContainer.appendChild(divCard)
        gameBoard.appendChild(divContainer)
    }
}


function flipCard() {
    card.classList.toggle("flipCard")
}
// const card = document.querySelector('.card');

// card.addEventListener('click', () => {
//     card.classList.toggle('.card.flipped');
// });

function startTimer() {
    cancel = setInterval(incrementSeconds, 1000);
}

function incrementSeconds() {
    seconds += 1;
    el.innerText = "Timer: " + seconds + " seconds";
}