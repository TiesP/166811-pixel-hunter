import footer from './components/footer';
import header from './components/header';
import getLineStats from './components/lineStats';
import {getData, getState} from './data';
import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting} from './utils.js';
import {checkComplete, nextLevel} from './game.js';
import stats from './stats';

export function getGameTemplate(level, state) {
  return `
    ${header(state)}
    ${getLevelTemplate(level)}
    ${footer}
  `;
}

function getLevelTemplate(level) {
  return `
     <div class="game">
      <p class="game__task">${getData().types[level.type].title}</p>
      <form class="game__content ${getData().types[level.type].className}">
        ${getOptionResults(level.pictures, level.type)}
      </form>
      ${getLineStats(level.stats)}
    </div>
   `;
}

function getOptionResults(arr, type) {
  return arr.reduce((r, item, i) => {
    return r + `
      <div class="game__option">
        <img src=${item.url} alt="Option ${i + 1}">
        ${getLabels(type, i)}
      </div>
    `;
  }, ``);
}

function getLabels(type, i) {
  if (type === `threePicture`) {
    return ``;
  } else {
    return `
    <label class="game__answer  game__answer--photo">
      <input name="question${i + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question${i + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
    `;
  }
}

export function getGameModule(level, state) {
  const template = getGameTemplate(level, state);
  const curModuleGame = getElementFromTemplate(template);
  addEventHandlers(curModuleGame, level);
  imgProportion(curModuleGame);
  return addHandlerBackGreeting(curModuleGame);
}

function addEventHandlers(curModuleGame, level) {
  let items;
  if (level.type === `twoPicture`) {
    items = Array.from(curModuleGame.querySelectorAll(`.game__option input`));
    items.forEach((item) => {
      item.addEventListener(`change`, (event) => {
        checkComplete(event);
        if (checkComplete(event)) {
          changePageTemplate(nextModule());
        }
      });
    });
  } else if (level.type === `onePicture`) {
    items = Array.from(curModuleGame.querySelectorAll(`.game__option input`));
    items.forEach((item) => {
      item.addEventListener(`click`, (event) => {
        changePageTemplate(nextModule());
      });
    });
  } else if (level.type === `threePicture`) {
    items = Array.from(curModuleGame.querySelectorAll(`.game__option`));
    items.forEach((item) => {
      item.addEventListener(`mousedown`, (event) => {
        if (event.which === 1) {
          changePageTemplate(nextModule());
        }
      });
    });
  }
}

function imgProportion(curModuleGame) {
  const imgs = Array.from(curModuleGame.querySelectorAll(`.game__option img`));
  imgs.forEach((item) => {
    item.addEventListener(`load`, (event) => {
      setProportions(item);
    });
  });
}

function setProportions(item) {
  const width = parseInt(getComputedStyle(item.parentNode, ``).width, 10);
  const height = parseInt(getComputedStyle(item.parentNode, ``).height, 10);
  if (item.naturalWidth / item.naturalHeight > width / height) {
    item.width = width;
  } else {
    item.height = height;
  }
}

function getModule() {
  const levels = getData().levels;
  const curLevel = getState().curLevel;
  if (curLevel < levels.length) {
    return getGameModule(levels[curLevel], getState());
  } else {
    return stats;
  }
}

function nextModule() {
  nextLevel();
  return getModule();
}

export default getModule();
