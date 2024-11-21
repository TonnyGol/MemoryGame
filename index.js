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

    for (counter = 1; counter <= cardCount * 2; counter++) {
        var image = document.createElement("img")
        image.classList.add("card")
        image.src = "assets/images/heartStone card.jpg"
        image.id = counter
        gameBoard.appendChild(image)
    }
}