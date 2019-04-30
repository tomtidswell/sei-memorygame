var cards = ["Queen", "Queen", "King", "King"];
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
  console.log("The user flipped a " + cards[cardId]);
  cardsInPlay.push(cards[cardId]);
  checkForMatch();
}

flipCard(1);
flipCard(2);
/*

var cardOne = cards[0];
var cardTwo = cards[2];


cardsInPlay.push(cardTwo);

*/
