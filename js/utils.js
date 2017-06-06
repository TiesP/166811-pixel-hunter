import greeting from './greeting';
import makeData from './data';

const main = document.querySelector(`main.central`);

export function changePageTemplate(template, which) {
  if (which && which !== 1) {
    return;
  }
  main.innerHTML = ``;
  main.appendChild(template);
}

export function getElementFromTemplate(text) {
  const node = document.createElement(`div`);
  node.innerHTML = text;

  const imgs = Array.from(node.querySelectorAll(`.game__option img`));
  imgs.forEach((item) => {
    item.addEventListener(`load`, (event) => {
      setProportions(item);
    });
  });
  return node;
}

export function addHandlerBackGreeting(curModule) {
  const itemBack = curModule.querySelector(`.back`);
  if (itemBack) {
    itemBack.addEventListener(`click`, () => {
      changePageTemplate(greeting);
    });
  }
  return curModule;
}

function getStats(stats) {
  const result = `
  <div class="stats">
    <ul class="stats">
      ${getListStats(stats)}
    </ul>
  </div>
  `;
  return result;
}

function getListStats(arr) {
  const result = arr.reduce((r, res) => {
    return r + `<li class="stats__result stats__result--${res}"</li>
    `;
  }, ``);
  return result;
}

export function getHeader(level) {
  const result = `
    <header class="header">
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
      ${getHeaderLevel(level)}
    </header>
  `;
  return result;
}

function getHeaderLevel(level) {
  if (!level) {
    return ``;
  } else {
    const data = makeData();
    const timer = data[level].timer;
    const lives = data[level].lives;
    const result = `
      <h1 class="game__timer">${timer}</h1>
      <div class="game__lives">
        ${
          new Array(3 - lives)
            .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
            .join(``)
        }
        ${
          new Array(lives)
            .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
            .join(``)
        }
      </div>
    `;
    return result;
  }
}

export function getLevel(level) {
  const data = makeData();
  const pictures = data[level].pictures;
  const stats = data[level].stats;
  const type = data[level].type;
  let title;
  let className = ``;
  if (type === `findDrawing`) {
    title = `Найдите рисунок среди изображений`;
    className = `game__content--triple`;
  } else {
    if (pictures.length === 1) {
      title = `Угадай, фото или рисунок?`;
      className = `game__content--wide`;
    } else {
      title = `Угадайте для каждого изображения фото или рисунок?`;
    }
  }

  const result = `
     <div class="game">
      <p class="game__task">${title}</p>
      <form class="game__content ${className}">
        ${getOptionResults(pictures, type)}
      </form>
      ${getStats(stats)}
    </div>
   `;
  return result;
}

function getOptionResults(arr, type) {
  const result = arr.reduce((r, item, i) => {
    return r + `
      <div class="game__option  ${(item.selected === true) ? `game__option--selected` : ``}">
        <img src=${item.url} alt="Option ${i + 1}" width="${item.width}" height="${item.height}">
        ${getLabels(type, i)}
      </div>
    `;
  }, ``);
  return result;
}

function getLabels(type, i) {
  if (type === `findDrawing`) {
    return ``;
  } else {
    const result = `
    <label class="game__answer  game__answer--photo">
      <input name="question${i + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question${i + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
    `;
    return result;
  }
}

export function getResults() {
  const data = makeData();
  return data.results.reduce((r, item, i) => {
    return r + getTable(item, i);
  }, ``);
}

function getTable(item, i) {
  let tableText;
  if (item.totalFinal === 0) {
    tableText = `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td>
            ${getStats(item.stats)}
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
    `;
  } else {
    tableText = `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td colspan="2">
            ${getStats(item.stats)}
          </td>
          <td class="result__points">×&nbsp;${item.points}</td>
          <td class="result__total">${item.total}</td>
        </tr>
        ${getBonuses(item.bonuses)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${item.total + getSumBonuses(item.bonuses)}</td>
        </tr>
      </table>
    `;
  }
  return tableText;
}

function getSumBonuses(bonuses) {
  return bonuses.reduce((r, item) => {
    return r + (item.points * item.count);
  }, 0);
}

function getBonuses(bonuses) {
  return bonuses.reduce((r, item) => {
    return r + getRowBonus(item);
  }, ``);
}

function getRowBonus(item) {
  let name;
  let className;
  let points = item.points;
  if (item.type === `fast`) {
    name = `Бонус за скорость`;
    className = `stats__result--fast`;
  } else if (item.type === `heart`) {
    name = `Бонус за жизни`;
    className = `stats__result--heart`;
  } else if (item.type === `slow`) {
    name = `Штраф за медлительность`;
    className = `stats__result--slow`;
    points = -points;
  }

  const text = `
    <tr>
    <td></td>
    <td class="result__extra">${name}:</td>
    <td class="result__extra">${item.count}&nbsp;<span class="stats__result ${className}"></span></td>
    <td class="result__points">×&nbsp;${points}</td>
    <td class="result__total">${item.points * item.count}</td>
    </tr>
  `;
  return text;
}

export function setProportions(item) {
  if (item.naturalWidth / item.naturalHeight > item.width / item.height) {
    item.height = item.naturalHeight * item.width / item.naturalWidth;
  } else {
    item.width = item.naturalWidth * item.height / item.naturalHeight;
  }
}
