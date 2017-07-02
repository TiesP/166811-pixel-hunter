import StatsView from './stats-view';
import {changeView} from '../utils';
import Application from '../main';
import {getData} from '../data';

class StatsScreen {
  constructor(state = {answers: [], lives: 0}) {
    this.result = this.fillResults(state);
    this.view = new StatsView(this.result);
  }

  init() {
    changeView(this.view);

    this.view.onPrevScreen = () => {
      Application.showWelcome();
    };

  }

  fillResults(state) {
    const result = {};
    const bonuses = {};
    const total = state.answers.reduce((r, item) => {
      if (item.correct) {
        this.checkAddBonus(item.time, bonuses);
        return r + getData().rules.correctAnswerPoints;
      } else {
        return r;
      }
    }, 0);
    this.addBonus(bonuses, getData().rules.remainingLifePoints, `heart`, state.lives);

    result.total = total;
    result.points = getData().rules.correctAnswerPoints;
    result.bonuses = bonuses;
    result.answers = state.answers;

    return result;
  }

  checkAddBonus(time, bonuses) {
    const addPoints = getData().rules.addPoints;
    for (let i = 0; i < addPoints.length; i++) {
      if (time <= addPoints[i].time) {
        let points = addPoints[i].points;
        this.addBonus(bonuses, points, addPoints[i].type);
        return points;
      }
    }
    return 0;
  }

  addBonus(bonuses, points, type, count = 0) {
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

}

export default StatsScreen;
