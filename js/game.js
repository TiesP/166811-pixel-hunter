import {getState, setState} from './data';

const stateModule = { question1: ``, question2: `` };

export function nextLevel() {
  setState(`curLevel`, getState().curLevel + 1);
}

export function checkComplete(e) {
  stateModule[e.currentTarget.name] = e.currentTarget.value;
  let key;
  let complete = true;
  for (key in stateModule) {
    if (!stateModule[key]) {
      complete = false;
    }
  }
  return complete;
}
