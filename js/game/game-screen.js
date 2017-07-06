import GameView from './game-view';
import {changeView} from '../utils';
import Application from '../application';
import {getData} from '../data';
import {getStats, fillResults} from '../stats/stats';
import {saveResults} from '../api';
import {getState, GameType} from '../data';

class GameScreen {

  constructor(levels) {

    this.levels = levels;

  }

  init() {
    this.state = this._setState(getData().initialState);
    this.answers = [];

    this._update();
  }

  _update() {
    this.level = this.levels[this.state.curLevel];

    this.view = new GameView({
      lives: this.state.lives,
      level: this.level
    });

    this._tickTimer();
    this.stateModule = {};

    this.view.setStats(getStats(this.answers, this.levels.length));
    changeView(this.view);

    this.view.onPrevScreen = () => {
      this._stopTimer();
      Application.showWelcome();
    };

    this.view.checkAnswer = (item) => {
      if (this._answerComplete(item)) {
        const correct = this._answerCorrect(item);
        this._changeScreen(correct);
      }
    };

  }

  _changeScreen(correct) {
    this.answers = this._addAnswer(this.answers, this.state.time, correct);
    this._stopTimer();
    if (!correct) {
      this.state = this._reduceLives(this.state);
      if (this.state.lives === 0) {
        this._showStats();
        return;
      }
    }
    this._nextScreen();
  }

  _tickTimer() {
    clearTimeout(this.timeout);

    const timeForLevel = getData().rules.timer;
    this.view.setTime(timeForLevel - this.state.time);
    this.state = this._changeState(this.state, `time`, this.state.time + 1);
    if (this.state.time > timeForLevel) {
      this._changeScreen(false);
      return;
    } else if (timeForLevel - this.state.time < 6) {
      this.view.blink();
    }

    this.timeout = setTimeout(() => this._tickTimer(), 1000);
  }

  _stopTimer() {
    clearTimeout(this.timeout);
    this.state = this._changeState(this.state, `time`, 0);
  }

  _answerCorrect(item) {
    if (this.level.type === GameType.TWO_OF_TWO) {
      return this._checkCorrect();
    } else {
      const type = getState().imgs[item.dataset.url].type;
      if (this.level.type === GameType.ONE_OF_THREE) {
        return (type === `painting`);
      } else {
        return (type === item.value);
      }
    }
  }

  _answerComplete(item) {
    if (this.level.type === GameType.TWO_OF_TWO) {
      const type = getState().imgs[item.dataset.url].type;
      this.stateModule[item.name] = (type === item.value);
      return (Object.keys(this.stateModule).length === 2);
    } else {
      return true;
    }
  }

  _nextScreen() {
    if (this.state.curLevel < (this.levels.length - 1)) {
      this._nextLevel();
    } else {
      this._showStats();
    }
  }

  _showStats() {
    const stateResult = {
      answers: this.answers,
      lives: this.state.lives
    };

    const result = fillResults(stateResult);
    saveResults({
      stats: getStats(result.answers),
      lives: result.lives
    })
      .then(() => {})
      .catch(window.console.error);

    Application.showStats(stateResult);
  }

  _nextLevel() {
    this.state = this._increaseLevel(this.state);
    this._update();
  }

  _increaseLevel(state) {
    let curLevel = state.curLevel;
    if (!curLevel) {
      curLevel = 0;
    }
    curLevel = curLevel + 1;
    this.level = this.levels[curLevel];
    return this._changeState(state, `curLevel`, curLevel);
  }

  _reduceLives(state) {
    const lives = state.lives;
    if (lives === 0) {
      return state;
    }
    return this._changeState(state, `lives`, lives - 1);
  }

  _setState(newValue) {
    return Object.assign({}, newValue);
  }

  _changeState(state, key, value) {
    state = Object.assign({}, state);
    state[key] = value;
    return state;
  }

  _addAnswer(answers = [], time, correct) {
    return answers.concat({time, correct});
  }

  _checkCorrect() {
    const keys = Object.keys(this.stateModule);
    for (let curKey of keys) {
      if (!this.stateModule[curKey]) {
        return false;
      }
    }
    return true;
  }

}

export default GameScreen;
