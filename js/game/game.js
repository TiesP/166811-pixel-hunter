import GameView from './game-view';
import {changeView} from '../utils';
import App from '../main';
import {getData} from '../data';

class Game {

  constructor() {
    this.MAX_LEVEL = getData().levels.length - 1;
    this.initialization();
  }

  init() {
    this.stateModule = {};

    changeView(this.view);

    this.view.onPrevScreen = () => {
      App.showGreeting();
    };

    this.view.checkAnswer = (item) => {
      if (this.answerComplete(item)) {
        const correct = this.answerCorrect(item);
        this.answers = this.addAnswer(this.answers, 0, correct);
        if (!correct) {
          this.state = this.reduceLives(this.state);
          if (this.state.lives === 0) {
            this.showStats();
            return;
          }
        }
        this.nextScreen();
      }
    };

  }

  initialization() {
    this.state = this.setState(getData().initialState);
    this.answers = [];
    this.stats = [];
    this.level = getData().levels[this.state.curLevel];

    this.view = new GameView({
      lives: this.state.lives,
      timer: this.state.timer,
      level: this.level,
      stats: this.stats
    });
  }

  answerCorrect(item) {
    if (this.level.type === `twoPicture`) {
      return this.checkCorrect();
    } else {
      const type = App.imgs[item.dataset.url];
      if (this.level.type === `threePicture`) {
        return (type === `paint`);
      } else {
        return (type === item.value);
      }
    }
  }

  answerComplete(item) {
    if (this.level.type === `twoPicture`) {
      const type = App.imgs[item.dataset.url];
      this.stateModule[item.name] = (type === item.value);
      return (Object.keys(this.stateModule).length === 2);
    } else {
      return true;
    }
  }

  nextScreen() {
    if (this.state.curLevel < this.MAX_LEVEL) {
      this.nextLevel();
    } else {
      this.showStats();
    }
  }

  showStats() {
    App.showStats({
      answers: this.answers,
      stats: this.stats,
      lives: this.state.lives
    });
  }

  nextLevel() {
    this.state = this.increaseLevel(this.state);

    this.view = new GameView({
      lives: this.state.lives,
      timer: this.state.timer,
      level: this.level,
      stats: this.stats
    });

    this.init();
  }

  increaseLevel(state) {
    let curLevel = state.curLevel;
    if (!curLevel) {
      curLevel = 0;
    }
    curLevel = curLevel + 1;
    this.level = getData().levels[curLevel];
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
    const newAnswers = answers.concat({time, correct});

    const newStats = this.addStat(this.stats, time, correct);
    this.stats = newStats;
    return newAnswers;
  }

  addStat(stats, time, correct) {
    if (!stats) {
      stats = [];
    }
    return stats.concat(this.getStats(correct, time));
  }

  getStats(correct, time) {
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

export default new Game();
