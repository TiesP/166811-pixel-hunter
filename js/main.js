import Intro from './intro/intro';
import Greeting from './greeting/greeting';
import Rules from './rules/rules';
import Stats from './stats/stats';
import Game from './game/game';
import {getData} from './data';

class App {
  constructor() {
    this.imgs = {};
    this.init();
  }

  init() {
    this.showIntro();
  }

  showIntro() {
    Intro.init();
    this.imgs = this.fillListImg();
  }

  fillListImg() {
    const levels = getData().levels;
    const imgs = levels.reduce((r, level) => {
      level.pictures.forEach((img) => {
        r[img.url] = img.type;
      });
      return r;
    }, {});
    return imgs;
  }

  showGreeting() {
    Greeting.init();
  }

  showRules() {
    Rules.init();
  }

  showStats(state) {
    const newStats = new Stats(state);
    newStats.init();
  }

  showGame() {
    Game.initialization();
    Game.init();
  }

}

export default new App();
