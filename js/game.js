import {getState, setState, getData} from './data';

const stateModule = {};

export function newGame() {
  const newState = getData().initialState;
  newState.answers = [];
  newState.result = {};
  setState(newState);
}

export function nextLevel(state) {
  const newLevel = state.curLevel + 1;
  state = Object.assign({}, state);
  state.curLevel = newLevel;
  return state;
}

export function reduceLives(state) {
  const newLives = state.lives - 1;
  state = Object.assign({}, state);
  state.lives = newLives;
  return state;
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
  const answers = state.answers;
  const newAnswers = answers.concat({time, correct});
  state = Object.assign({}, state);
  state.answers = newAnswers;
  return state;
}

export function fillResults(state) {
  const result = {};
  const answers = state.answers;
  const total = answers.reduce((r, item) => {
    return r + (item.correct ? (100 + checkBonus(item.time)) : 0);
  }, 0);
  result.total = total;
  state = Object.assign({}, state);
  state.result = result;
  return state;
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
