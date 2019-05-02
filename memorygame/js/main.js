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
  }
];

var cardsInPlay = [];
var randomisedCards = [];
var gameBoard = document.getElementById('game-board');
var gameMessage = document.getElementById('game-message');
var gameScore = document.getElementById('game-score');
var gamesPlayed = 0;
var gamesWon = 0;

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
  randomisedCards = [];
  gameMessage.classList.remove("show");
  createBoard();
}

function checkForMatch(){
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0].rank===cardsInPlay[1].rank) {
      gameMessage.textContent = "Its a match!!! Well done.";
      gameMessage.classList.toggle("show");
      gamesWon++;
    } else {
      gameMessage.textContent = "Better luck next time :(";
      gameMessage.classList.toggle("show");
    }
    gamesPlayed++;
    gameScore.textContent = gamesWon+"/"+gamesPlayed
  }
}

function flipCard(){
  var cardId = this.getAttribute('data-id');
  if(!verifyFlip(cards[cardId])){
    console.log("Flip not permitted");
    return false;
  }
  cardsInPlay.push(cards[cardId]);
  this.setAttribute('src', cards[cardId].cardImage);
  checkForMatch();
}

function verifyFlip(flippedCard){
  //check that there arent already two flipped cards
  var allowFlip = cardsInPlay.length >= 2 ? false : true;
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
/*


var cardOne = cards[0];
var cardTwo = cards[2];


cardsInPlay.push(cardTwo);

*/
