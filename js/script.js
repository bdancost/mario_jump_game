const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreElement = document.getElementById("score");
let score = 0;

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const restartButton = document.getElementById("restart-button");

const restartGame = () => {
  location.reload(); // Recarrega a página para reiniciar o jogo
};

restartButton.addEventListener("click", restartGame);

const loop = setInterval(() => {
  console.log("loop");

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    // Exibe o botão de reiniciar ao terminar o jogo
    restartButton.style.display = "block";

    clearInterval(loop);
  } else {
    // Incrementa a pontuação
    score++;
    scoreElement.innerHTML = score;

    // Aumenta a dificuldade (diminui o tempo da animação)
    if (score % 100 === 0) {
      pipeSpeed -= 0.1; // Aumenta a velocidade
      pipe.style.animation = `pipe-animation ${pipeSpeed}s infinite linear`;
    }
  }
}, 10);

document.addEventListener("keydown", jump);
