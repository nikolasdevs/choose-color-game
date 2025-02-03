const colorBox = document.querySelector(".color-box");
const colorOptionsBox = document.querySelector(".color-options");
const statusText = document.querySelector(".status");
const userScore = document.querySelector("[data-testid='score']");
const scoreDisplay = document.querySelector(".score");
const menuBtn = document.querySelector(".menu-btn");
const instructions = document.querySelector(".instructions");

let targetColor;
let score = 0;

function generateRandomColor() {
  return `rgb(
  ${Math.floor(Math.random() * 256)}, 
  ${Math.floor(Math.random() * 256)}, 
  ${Math.floor(Math.random() * 256)})`;
}

function startNewRound() {
  colorOptionsBox.innerHTML = "";
  targetColor = generateRandomColor();
  colorBox.style.backgroundColor = targetColor;
  const options = [];
  for (let i = 0; i < 6; i++) {
    options.push(generateRandomColor());
  }

  if (!options.includes(targetColor)) {
    options[Math.floor(Math.random() * 6)] = targetColor;
  }

  options.forEach((color) => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-testid", "colorOption");
    btn.onclick = () => checkUserGuess(color);
    colorOptionsBox.appendChild(btn);
  });

  statusText.textContent = "";
  statusText.classList.remove("correct");
  statusText.classList.remove("wrong");
}

function checkUserGuess(selectedColor) {
  if (selectedColor === targetColor) {
    score++;
    userScore.textContent = score;
    statusText.textContent = "Correct! ✅";
    statusText.classList.add("correct");
    setTimeout(startNewRound, 1000);
  } else {
    statusText.textContent = "😱 Wrong!  Try again.";
    statusText.classList.remove("correct");
    statusText.classList.add("wrong");
  }
}

function resetGame() {
  score = 0;
  userScore.textContent = score;
  startNewRound();
}
menuBtn.addEventListener("click", () => {
  instructions.classList.toggle("open");
  const isOpen = instructions.classList.contains("open");
  menuBtn.innerHTML = `
    <img src="./${isOpen ? "chevron_left" : "chevron_right"}.svg" 
         alt="Menu Button" 
         aria-label="${isOpen ? "Close menu" : "Open menu"}">
  `;
});
startNewRound();
