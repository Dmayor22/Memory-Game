// Declaring variables to be used
const cards = document.querySelectorAll(".card");
const flipCountCard = document.getElementById("flip_countdown")
let matchedcard = 0;
let flipCount = 0
let cardOne, cardTwo;
let disableDeck = false;

// Function for flipCard
const flipCard = (e) => {
  // Get user clicked card
  let clickCard = e.target;
  cardTwo = clickCard;

  //   prevents user from picking the card twice
  if (clickCard !== cardOne && !disableDeck) {
    clickCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickCard);
    }

    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);

    flipCountCard.innerHTML = ++flipCount
  }
};

// function for matchImg card
const matchCards = (img1, img2) => {
  if (img1 === img2) {
    matchedcard++;
    if (matchedcard === 8) {
      setTimeout(() => {
          
        return shufflecard();
      }, 1500);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  //   if cards dont match
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
};

// Function for shuffle Card
const shufflecard = () => {
    
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => {
    return Math.random() > 0.5 ? 1 : -1;
  });
  matchedcard = 0;
  cardOne = cardTwo = "";
  //   disableDeck = false;

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });

  flipCountCard.innerHTML = 0
};

shufflecard();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
