let currentPage = 1;
const main = document.querySelector(`main.central`);
const templatesInOrder = [
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
  `stats`
];
const templates = Array.from(document.getElementsByTagName(`template`));
templates.sort((a, b) => {
  return templatesInOrder.indexOf(a.id) - templatesInOrder.indexOf(b.id);
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
  if (currentPage === templatesInOrder.length) {
    currentPage = 0;
  }
  if (currentPage === -1) {
    currentPage = templatesInOrder.length - 1;
  }
  showScreenByNumber(currentPage);
}

function showScreenByNumber(num) {
  if (templates[num]) {
    main.innerHTML = templates[num].innerHTML;
  }
}

showScreenByNumber(currentPage);
