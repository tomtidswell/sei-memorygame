var cards = ["Queen", "Queen", "King", "King"];
var cardsInPlay = [];

var cardOne = cards[0];
var cardTwo = cards[2];

cardsInPlay.push(cardOne);
cardsInPlay.push(cardTwo);

console.log("The user flipped a " + cardsInPlay);

if (cardsInPlay.length === 2) {
  if (cardsInPlay[0]===cardsInPlay[1]) {
    console.log("Its a match!!! Well done.");
  } else {
    console.log("Better luck next time :(");
  }
}
