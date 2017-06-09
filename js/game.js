import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting} from './utils.js';
import {getData, getState, setState} from './data';
import getGameTemplate from './gameView';
import stats from './stats';

const levels = getData(`levels`);
let level = levels[getState().curLevel];
const stateModule = {question1: ``, question2: ``};

function getModule() {
  const curLevel = getState().curLevel;
  if (curLevel < levels.length) {
    level = levels[curLevel];
    let template = getGameTemplate(level);
    let curModuleGame = getElementFromTemplate(template, getState());
    addEventHandlers(curModuleGame);
    imgProportion(curModuleGame);
    return curModuleGame;
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

function addEventHandlers(curModuleGame) {
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
        changePageTemplate(nextModule(), event.which);
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
  if (item.naturalWidth / item.naturalHeight > item.width / item.height) {
    item.height = item.naturalHeight * item.width / item.naturalWidth;
  } else {
    item.width = item.naturalWidth * item.height / item.naturalHeight;
  }
}

let moduleGame = getModule();

export default addHandlerBackGreeting(moduleGame);
