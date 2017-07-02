import IntroScreen from './intro/intro-screen';
import WelcomeScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import StatsScreen from './stats/stats-screen';
import NewGameScreen from './game/game-screen';
import {getData} from './data';

class Application {
  constructor() {
    this.imgs = {};
    this.init();
  }

  init() {
    this.showIntro();
  }

  showIntro() {
    IntroScreen.init();
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

  showWelcome() {
    WelcomeScreen.init();
  }

  showRules() {
    RulesScreen.init();
  }

  showStats(state) {
    const newStats = new StatsScreen(state);
    newStats.init();
  }

  showGame() {
    NewGameScreen.initialization();
    NewGameScreen.init();
  }

}

export default new Application();
