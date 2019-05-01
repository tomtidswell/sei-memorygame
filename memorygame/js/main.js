var cards = [
  {
    rank:"Queen",
    suit:"Hearts",
    cardImage:"images/queen-of-hearts.png"
  },
  {
    rank:"Queen",
    suit:"Diamonds",
    cardImage:"images/queen-of-diamonds.png"
  },
  {
    rank:"King",
    suit:"Hearts",
    cardImage:"images/king-of-hearts.png"
  },
  {
    rank:"King",
    suit:"Diamonds",
    cardImage:"images/king-of-diamonds.png"
  }
];

var cardsInPlay = [];

function checkForMatch(){
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0]===cardsInPlay[1]) {
      console.log("Its a match!!! Well done.");
    } else {
      console.log("Better luck next time :(");
    }
  }
} 

function flipCard(cardId){
  console.log("The user flipped a " + cards[cardId].rank);
  console.log(cards[cardId].suit);
  console.log(cards[cardId].cardImage);
  cardsInPlay.push(cards[cardId].rank);
  checkForMatch();
}

flipCard(1);
flipCard(2);
/*


var cardOne = cards[0];
var cardTwo = cards[2];


cardsInPlay.push(cardTwo);

*/
