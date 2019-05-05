var cards = [
  {
    id: 0,
    rank:"Queen",
    suit:"Hearts",
    cardImage:"img/queen-of-hearts.png",
    randomSeed: 0
  },
  {
    id: 1,
    rank:"Queen",
    suit:"Diamonds",
    cardImage:"img/queen-of-diamonds.png"
  },
  {
    id: 2,
    rank:"King",
    suit:"Hearts",
    cardImage:"img/king-of-hearts.png"
  },
  {
    id: 3,
    rank:"King",
    suit:"Diamonds",
    cardImage:"img/king-of-diamonds.png"
  },
  {
    id: 4,
    rank:"Ace",
    suit:"Hearts",
    cardImage:"img/ace-of-hearts.png"
  },
  {
    id: 5,
    rank:"Ace",
    suit:"Diamonds",
    cardImage:"img/ace-of-diamonds.png"
  }
];

var cardsInPlay = [];
var cardsMatched = [];
var randomisedCards = [];
var gameBoard = document.getElementById('game-board');
var gameMessage = document.getElementById('game-message');
var gameScore = document.getElementById('game-score');
var gameBestScore = document.getElementById('game-best-score');
var totalFlips = 0;
var bestScore = 100;

document.getElementById('reset-button').addEventListener("click",resetBoard);

function createBoard(){
  var randomised = [];
  //randomise the card order
  for (var i = 0; i < cards.length; i++) {
    randomised = Math.random();
    cards[i].randomSeed = randomised;
    randomisedCards.push(randomised);
  }
  randomisedCards.sort();


  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute("src","img/back.png");

    //loop through the card stack and find the card.id that is equal to the i'th random card
    cards.forEach( function(card) {
      if(card.randomSeed===randomisedCards[i]){
        cardElement.setAttribute("data-id",card.id);
      }
    });

    cardElement.addEventListener("click",flipCard);
    gameBoard.appendChild(cardElement);
  }
}

function resetBoard(){
  gameBoard.innerHTML = "";
  gameMessage.innerHTML = "&nbsp;";
  cardsInPlay = [];
  cardsMatched = [];
  randomisedCards = [];
  totalFlips = 0;
  gameScore.textContent = totalFlips;
  gameMessage.classList.remove("show");
  createBoard();
}

function checkForMatch(){
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0].rank===cardsInPlay[1].rank) {
      updateText("Its a match!!! Well done. Keep going!");
      //move the items from the inPlay array to the matched array
      cardsInPlay.forEach( function(arrayItem) {
        cardsMatched.push(arrayItem)
      });
      cardsInPlay = [];
    } else {
      updateText("Not a match :( Keep going!");
      setTimeout(function(){ flipAllBack(); }, 1500);
    }
    totalFlips++;
    gameScore.textContent = totalFlips;
  }
  //winning flip
  if (cardsMatched.length === cards.length) {
    if (totalFlips < bestScore) {
      updateText("Youve done it, and got a new high score! High Five!");
      bestScore = totalFlips;
      gameBestScore.textContent = bestScore;
    }else{
      updateText("Youve done it! Try again to beat that great score");
    }
  }
}

function updateText(newText){
  gameMessage.innerHTML = newText;
  gameMessage.classList.add("show");
  setTimeout(function(){ gameMessage.classList.remove("show"); }, 2000);
}

function flipCard(){
  var cardId = this.getAttribute('data-id');
  if(!verifyFlip(cards[cardId])){
    console.log("Flip not permitted");
    return false;
  }
  cardsInPlay.push(cards[cardId]);
  var cardToFlip = this;
  setTimeout(function(){ cardToFlip.setAttribute('src', cards[cardId].cardImage); }, 300);
  this.classList.add("flip");
  checkForMatch();
}

function flipAllBack(){
  cardsInPlay.forEach( function(arrayItem) {
    var cardToFlip = document.querySelector('[data-id="'+arrayItem.id+'"]')
    setTimeout(function(){ cardToFlip.setAttribute('src', "img/back.png"); }, 300);
    cardToFlip.classList.remove("flip");
  });
  cardsInPlay = [];
}

function verifyFlip(flippedCard){
  //check that there arent already two flipped cards
  var allowFlip = cardsInPlay.length >= 2 ? false : true;
  if(!allowFlip){return false;}

  //check that that card isnt already matched
  cardsMatched.forEach( function(arrayItem) {
    if(arrayItem.id===flippedCard.id){
      allowFlip = false;
    }
  });
  if(!allowFlip){return false;}

  //check that that card isnt already flipped
  cardsInPlay.forEach( function(arrayItem) {
    if(arrayItem.id===flippedCard.id){
      allowFlip = false;
    }
  });
  if(!allowFlip){return false;}
  else {return true;}
}

createBoard();
