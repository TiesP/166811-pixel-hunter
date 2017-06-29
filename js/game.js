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
  let curLevel = state.curLevel;
  if (!curLevel) {
    curLevel = 0;
  }
  return changeState(state, `curLevel`, curLevel + 1);
}

export function reduceLives(state) {
  let lives = state.lives;
  if (!lives) {
    lives = getData().initialState.lives;
  }
  return changeState(state, `lives`, lives - 1);
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
  let answers = state.answers;
  if (!answers) {
    answers = [];
  }

  const newAnswers = answers.concat({time, correct});
  state = changeState(state, `answers`, newAnswers);

  const newStats = addStat(state, time, correct);
  state = changeState(state, `stats`, newStats);
  return state;
}

export function addStat(state, time, correct) {
  let stats = state.stats;
  if (!stats) {
    stats = [];
  }
  return stats.concat(getStats(correct, time));
}

export function getStats(correct, time) {
  if (!correct) {
    return `wrong`;
  }
  const addPoints = getData().rules.addPoints;
  for (let i = 0; i < addPoints.length; i++) {
    if (time <= addPoints[i].time) {
      return addPoints[i].type;
    }
  }
  return `unknown`;
}

export function fillResults(state) {
  const result = {};
  const bonuses = {};
  const total = state.answers.reduce((r, item) => {
    if (item.correct) {
      checkBonus(item.time, bonuses);
      return r + 100;
    } else {
      return r;
    }
  }, 0);
  result.total = total;
  result.bonuses = bonuses;
  result.stats = state.stats;
  return result;
}

export function checkBonus(time, bonuses) {
  const addPoints = getData().rules.addPoints;
  for (let i = 0; i < addPoints.length; i++) {
    if (time <= addPoints[i].time) {
      let points = addPoints[i].points;
      addBonus(bonuses, points, addPoints[i].type);
      return points;
    }
  }
  return 0;
}

export function addBonus(bonuses, points, type) {
  if (!bonuses) {
    return;
  }
  if (points !== 0) {
    if (!bonuses[type]) {
      bonuses[type] = {count: 1, points};
    } else {
      bonuses[type].count++;
    }
  }
}
