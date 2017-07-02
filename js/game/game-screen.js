import GameView from './game-view';
import {changeView} from '../utils';
import Application from '../main';
import {getData} from '../data';
import {getStats, fillResults} from '../stats/stats';

class GameScreen {

  constructor(levels) {

    this.levels = levels;

  }

  init() {
    this.state = this.setState(getData().initialState);
    this.answers = [];

    this.update();
  }

  update() {
    this.level = this.levels[this.state.curLevel];

    this.view = new GameView({
      lives: this.state.lives,
      level: this.level
    });

    this.tickTimer();
    this.stateModule = {};

    this.view.setStats(getStats(this.answers, this.levels.length));
    changeView(this.view);

    this.view.onPrevScreen = () => {
      this.stopTimer();
      Application.showWelcome();
    };

    this.view.checkAnswer = (item) => {
      if (this.answerComplete(item)) {
        const correct = this.answerCorrect(item);
        this.changeScreen(correct);
      }
    };

  }

  changeScreen(correct) {
    this.answers = this.addAnswer(this.answers, this.state.time, correct);
    this.stopTimer();
    if (!correct) {
      this.state = this.reduceLives(this.state);
      if (this.state.lives === 0) {
        this.showStats();
        return;
      }
    }
    this.nextScreen();
  }

  tickTimer() {
    clearTimeout(this.timeout);

    const timeForLevel = getData().rules.timer;
    this.view.setTime(timeForLevel - this.state.time);
    this.state = this.changeState(this.state, `time`, this.state.time + 1);
    if (this.state.time > timeForLevel) {
      this.changeScreen(false);
      return;
    }

    this.timeout = setTimeout(() => this.tickTimer(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timeout);
    this.state = this.changeState(this.state, `time`, 0);
  }

  answerCorrect(item) {
    if (this.level.type === `twoPicture`) {
      return this.checkCorrect();
    } else {
      const type = Application.imgs[item.dataset.url];
      if (this.level.type === `threePicture`) {
        return (type === `paint`);
      } else {
        return (type === item.value);
      }
    }
  }

  answerComplete(item) {
    if (this.level.type === `twoPicture`) {
      const type = Application.imgs[item.dataset.url];
      this.stateModule[item.name] = (type === item.value);
      return (Object.keys(this.stateModule).length === 2);
    } else {
      return true;
    }
  }

  nextScreen() {
    if (this.state.curLevel < (this.levels.length - 1)) {
      this.nextLevel();
    } else {
      this.showStats();
    }
  }

  showStats() {
    const stateResult = {
      answers: this.answers,
      lives: this.state.lives
    };

    const result = fillResults(stateResult);
    Application.saveResults({
      stats: getStats(result.answers),
      lives: result.lives
    });

    Application.showStats(stateResult);
  }

  nextLevel() {
    this.state = this.increaseLevel(this.state);
    this.update();
  }

  increaseLevel(state) {
    let curLevel = state.curLevel;
    if (!curLevel) {
      curLevel = 0;
    }
    curLevel = curLevel + 1;
    this.level = this.levels[curLevel];
    return this.changeState(state, `curLevel`, curLevel);
  }

  reduceLives(state) {
    let lives = state.lives;
    // if (!lives) {
    //   lives = getData().initialState.lives;
    // }
    if (lives === 0) {
      return state;
    }
    return this.changeState(state, `lives`, lives - 1);
  }

  setState(newValue) {
    return Object.assign({}, newValue);
  }

  changeState(state, key, value) {
    state = Object.assign({}, state);
    state[key] = value;
    return state;
  }

  addAnswer(answers, time, correct) {
    if (!answers) {
      answers = [];
    }
    return answers.concat({time, correct});
  }

  checkCorrect() {
    const keys = Object.keys(this.stateModule);
    for (let i = 0; i < keys.length; i++) {
      if (!this.stateModule[keys[i]]) {
        return false;
      }
    }
    return true;
  }

}

export default GameScreen;
