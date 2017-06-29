import {getState, setState, getData} from './data';

const stateModule = {};

export function newGame() {
  const newState = getData().initialState;
  newState.answers = [];
  newState.result = {};
  setState(newState);
}

function changeState(state, key, value) {
  state = Object.assign({}, state);
  state[key] = value;
  return state;
}

export function nextLevel(state) {
  return changeState(state, `curLevel`, state.curLevel + 1);
}

export function reduceLives(state) {
  return changeState(state, `lives`, state.lives - 1);
}

function checkCorrect() {
  let correct = true;
  for (let key in stateModule) {
    if (stateModule[key] === false) {
      correct = false;
    }
  }
  return correct;
}

export function checkAnswer(item, twoQuestions) {
  if (twoQuestions) {
    stateModule[item.name] = item.dataset.correct;
    const keys = Object.keys(stateModule);
    if (keys.length === 2) {
      setState(addAnswer(getState(), 0, checkCorrect()));
    }
  } else {
    setState(addAnswer(getState(), 0, item.dataset.correct));
  }
}

export function checkComplete() {
  return (Object.keys(stateModule).length === 2);
}

export function addAnswer(state, time, correct) {
  const answers = state.answers.concat({time, correct});
  return changeState(state, `answers`, answers);
}

export function fillResults(state) {
  const result = {};
  const total = state.answers.reduce((r, item) => {
    return r + (item.correct ? (100 + checkBonus(item.time)) : 0);
  }, 0);
  result.total = total;
  return changeState(state, `result`, result);
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
