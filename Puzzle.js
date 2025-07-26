const gameBoard = document.getElementById('gameBoard');
const items = ['🍎','🍌','🍓','🍇','🍉','🍒','🥝','🍍']; // 8 pairs
let cards = [...items, ...items]; // duplicate
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create cards
function createBoard() {
  shuffle(cards);
  cards.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.item = item;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped')) return;

  this.textContent = this.dataset.item;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

// Check match
function checkForMatch() {
  if (firstCard.dataset.item === secondCard.dataset.item) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetTurn();
    }, 1000);
  }
}

// Reset turn
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Start game
createBoard();
