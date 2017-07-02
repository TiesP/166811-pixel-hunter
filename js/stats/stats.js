import {getData} from '../data';

export function getStats(answers, maxCount = 0) {
  // const stats = [];
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
