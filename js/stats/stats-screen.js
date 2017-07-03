import StatsView from './stats-view';
import {changeView} from '../utils';
import Application from '../application';
import {fillResults} from './stats';
import {loadResults} from '../api';

class StatsScreen {
  constructor(state = {answers: [], lives: 0}) {
    this.result = fillResults(state);
  }

  init() {
    const arrHash = location.hash.split(`=`, 2);
    if (arrHash.length === 2) {
      let stateHash = decodeURIComponent(arrHash[1]);
      stateHash = JSON.parse(stateHash);

      this.result = fillResults(stateHash);
    }

    loadResults()
      .then((data) => {
        const results = data.map((item) => {
          return fillResults({
            lives: item.lives,
            answers: this._getAnswersFromStats(item.stats)
          });
        });

        this.view = new StatsView(this.result, results);
        changeView(this.view);
        this.view.onPrevScreen = () => {
          Application.showWelcome();
        };
      })
      .catch(window.console.error);
  }

  _getAnswersFromStats(stats) {
    if (!stats) {
      return [];
    }
    return stats.map((item) => {
      return this._getAnswer(item);
    });
  }

  _getAnswer(item) {
    if (item === `fast`) {
      return {correct: true, time: 9};
    } else if (item === `correct`) {
      return {correct: true, time: 20};
    } else if (item === `wrong`) {
      return {correct: false, time: 30};
    } else if (item === `slow`) {
      return {correct: true, time: 30};
    }
    return {correct: false, time: 0};
  }

}

export default StatsScreen;
