let currentPage = 1;
const main = document.querySelector(`main.central`);
const templates = [
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`
].map((id) => {
  return document.querySelector(`template#${id}`);
});

document.addEventListener(`keydown`, checkKey);

function checkKey(event) {
  if (event.altKey) {
    if (event.code === `ArrowRight`) {
      changePage(1);
    } else if (event.code === `ArrowLeft`) {
      changePage(-1);
    }
  }
}

function changePage(step) {
  currentPage = currentPage + step;
  if (currentPage === templates.length) {
    currentPage = templates.length - 1;
    return;
  }
  if (currentPage === -1) {
    currentPage = 0;
    return;
  }
  showScreenByNumber(currentPage);
}

function showScreenByNumber(num) {
  main.innerHTML = templates[num].innerHTML;
}

showScreenByNumber(currentPage);
