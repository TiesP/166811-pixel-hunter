import {changePageTemplate} from './utils.js';
import {getData, getState, setState} from './data';
import {getGameModule} from './gameView';
import stats from './stats';

const stateModule = {question1: ``, question2: ``};

function getModule() {
  const levels = getData().levels;
  const curLevel = getState().curLevel;
  if (curLevel < levels.length) {
    return getGameModule(levels[curLevel], getState());
  } else {
    return stats;
  }
}

export function nextModule() {
  setState(`curLevel`, getState().curLevel + 1);
  return getModule();
}

export function checkComplete(e) {
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

export default getModule();
