document.querySelector("button").addEventListener("click", rollDices);

var imagenes = [
  "./images/dice1.png", 
  "./images/dice2.png", 
  "./images/dice3.png", 
  "./images/dice4.png", 
  "./images/dice5.png", 
  "./images/dice6.png"
];

function rollDices() {
  var randomNumber1 = Math.ceil(Math.random() * 6);
  var randomNumber2 = Math.ceil(Math.random() * 6);

  let imgs = document.querySelectorAll("img");

  imgs[0].setAttribute("src", imagenes[randomNumber1 - 1]);
  imgs[1].setAttribute("src", imagenes[randomNumber2 - 1]);

  var title = document.querySelector("h1");
  if (randomNumber1 > randomNumber2) {
    title.textContent = "Player 1 Won!";
    title.style.color = "#DA0463"; // Accent color for Player 1 win
  }
  if (randomNumber1 < randomNumber2) {
    title.textContent = "Player 2 Won!";
    title.style.color = "#404B69"; // Accent color for Player 2 win
  }
  if (randomNumber1 == randomNumber2) {
    title.textContent = "Tie!";
    title.style.color = "#DBEDF3"; // Tie color
  }
}
