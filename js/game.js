import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting} from './utils.js';
import {getData, getState, setState} from './data';
import getGameTemplate from './gameView';
import stats from './stats';

const levels = getData().levels;
const stateModule = {question1: ``, question2: ``};

function getModule() {
  const curLevel = getState().curLevel;
  if (curLevel < levels.length) {
    const level = levels[curLevel];
    const template = getGameTemplate(level, getState());
    const curModuleGame = getElementFromTemplate(template);
    addEventHandlers(curModuleGame, level);
    imgProportion(curModuleGame);
    return addHandlerBackGreeting(curModuleGame);
  } else {
    return stats;
  }
}

function nextModule() {
  setState(`curLevel`, getState().curLevel + 1);
  return getModule();
}

function checkComplete(e) {
  stateModule[e.currentTarget.name] = e.currentTarget.value;
  let complete = true;
  let key;
  for (key in stateModule) {
    if (!stateModule[key]) {
      complete = false;
    }
  }
  if (complete) {
    changePageTemplate(nextModule());
  }
}

function addEventHandlers(curModuleGame, level) {
  let items;
  if (level.type === `twoPicture`) {
    items = Array.from(curModuleGame.querySelectorAll(`.game__option input`));
    items.forEach((item) => {
      item.addEventListener(`change`, (event) => {
        checkComplete(event);
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

let moduleGame = getModule();

export default moduleGame;
