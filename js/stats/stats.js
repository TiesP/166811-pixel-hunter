import {getData} from '../data';

export function getStats(answers, maxCount = 0) {
  if (!answers) {
    return [];
  }

  const stats = answers.reduce((r, {correct, time}) => {
    return r.concat(getStat(correct, time));
  }, []);

  for (let i = stats.length; i < maxCount; i++) {
    stats.push(`unknown`);
  }

  return stats;
}


export function getStat(correct, time) {
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
      checkAddBonus(item.time, bonuses);
      return r + getData().rules.correctAnswerPoints;
    } else {
      return r;
    }
  }, 0);
  addBonus(bonuses, getData().rules.remainingLifePoints, `heart`, state.lives);

  result.total = total;
  result.points = getData().rules.correctAnswerPoints;
  result.bonuses = bonuses;
  result.answers = state.answers;
  result.lives = state.lives;

  return result;
}

function checkAddBonus(time, bonuses) {
  const addPoints = getData().rules.addPoints;
  for (let i = 0; i < addPoints.length; i++) {
    if (time <= addPoints[i].time) {
      const points = addPoints[i].points;
      addBonus(bonuses, points, addPoints[i].type);
      return points;
    }
  }
  return 0;
}

function addBonus(bonuses, points, type, count = 0) {
  if (!bonuses) {
    return;
  }
  if (count !== 0) {
    bonuses[type] = {count, points};
  } else if (points !== 0 && type !== `heart`) {
    if (!bonuses[type]) {
      bonuses[type] = {count: 1, points};
    } else {
      bonuses[type].count++;
    }
  }
}
