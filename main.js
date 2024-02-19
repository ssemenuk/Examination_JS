const memoryCards = document.querySelectorAll('.memory-card');

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomNumber(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function shuffleCards() {
    let order = Array.from(Array(memoryCards.length).keys());
    shuffleArray(order);
    memoryCards.forEach((card, index) => {
        setOrder(card, order[index]);
    });
}




function addClass(element, className) {
    element.classList.add(className);
}

function removeClass(element, className) {
    element.classList.remove(className);
}

function setOrder(element, order) {
    element.style.order = order;
}

function addEventListener(element, eventName, handler) {
    element.addEventListener(eventName, handler);
}
//
function changeImage(card) {
    const frontFace = card.querySelector('.front-face');
    const backFace = card.querySelector('.back-face');

    if (frontFace.classList.contains('show')) {
        frontFace.src = "патрон.jpg"; 
        backFace.src = "/img/js-badge.svg";
    } else {
        frontFace.src = "/img/js-badge.svg";
        backFace.src = "патрон.jpg"; 
       
    }
   

    frontFace.classList.toggle('show');
    backFace.classList.toggle('show');
}
//
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    addClass(this, 'flip');
    changeImage(this);

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    removeEventListener(firstCard, 'click', flipCard);
    removeEventListener(secondCard, 'click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        removeClass(firstCard, 'flip');
        removeClass(secondCard, 'flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

shuffleCards();

memoryCards.forEach(card => addEventListener(card, 'click', flipCard));
