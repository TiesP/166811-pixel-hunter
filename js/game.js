import {getState, setState, getData} from './data';

const stateModule = {question1: ``, question2: ``};

export function nextLevel() {
  setState(getState().curLevel + 1, `curLevel`);
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

export function reduceLives() {
  setState(getState().lives - 1, `lives`);
}

export function newGame() {
  setState(getData().initialState);
  setState([], `answers`);
  setState({}, `result`);
}

export function addAnswer(time, correct) {
  const answers = getState().answers;
  answers.push({time, correct});
  setState(answers, `answers`);
}

export function fillResults() {
  const result = {};
  const answers = getState().answers;
  const total = answers.reduce((r, item) => {
    return r + (item.correct ? (100 + checkBonus(item.time)) : 0);
  }, 0);
  result.total = total;
  setState(result, `result`);
}

export function checkBonus(time) {
  const additionalPoints = getData().rules.additionalPoints;
  for (let i = 0; i < additionalPoints.length; i++) {
    if (time <= additionalPoints[i].time) {
      return additionalPoints[i].points;
    }
  }
  return 0;
}
