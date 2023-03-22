const gameContainer = document.getElementById("game");
let clickCount = 0;
const startBtn = document.querySelector('button');
let noClicking = false;

function showGameScreen(){
    let game = document.querySelector('#main-game');
    game.style.display = 'block';
    let startScreen = document.querySelector('#start-screen');
    startScreen.style.display = 'none';
}

startBtn.addEventListener('click', showGameScreen);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    let firstFlip = newDiv.onclick;

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {

  if (event.target.classList.contains("flipped")) return;
  if (noClicking) return;

  clickCount++;

  function flipCard(colorArr, event) {
    for (let color of colorArr) {
      if (event.classList.contains(color)) {
          setTimeout(function(){event.style.background = color;}, 100);
      }
    }
    //time the turn overs so they are smooth
    event.classList.add('turn');
    setTimeout(function(){event.classList.add('back');}, 100);
    setTimeout(function(){event.classList.remove('turn');}, 800);
  }

  // odd numbered clicks turn a card
  if (clickCount % 2 === 1) {

    flipCard(shuffledColors, event.target);

    //store odd numbered events to compare with evens
    firstFlip = event.target;

    firstFlip.classList.add('flipped');
    
  } else if (firstFlip.classList.contains(event.target.className)) {

      noClicking = true;

      flipCard(shuffledColors, event.target);

      event.target.classList.add('flipped');

      setTimeout(function(){noClicking=false;}, 800);

  } else if (!firstFlip.classList.contains(event.target.className)) {

      noClicking = true;

      flipCard(shuffledColors, event.target);

      setTimeout(function(){event.target.classList.remove('back');}, 970);
      setTimeout(function(){event.target.classList.add('turn');}, 1000);
      setTimeout(function(){event.target.style.background = 'white';}, 1200);
      setTimeout(function(){event.target.classList.remove('turn');}, 1300);

      //flip for the odd numbered previous event
      setTimeout(function(){firstFlip.classList.remove('back');}, 970);
      setTimeout(function(){firstFlip.classList.add('turn');}, 1000);
      setTimeout(function(){firstFlip.style.background = 'white';}, 1200);
      setTimeout(function(){firstFlip.classList.remove('turn');}, 1300);

      firstFlip.classList.remove('flipped');
      event.target.classList.remove('flipped');

      setTimeout(function(){noClicking=false;}, 1300);
  }
  }

  createDivsForColors(shuffledColors);
