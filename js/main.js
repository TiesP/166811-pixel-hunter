import 'babel-polyfill';
import 'whatwg-fetch';
import IntroScreen from './intro/intro-screen';
import WelcomeScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import StatsScreen from './stats/stats-screen';
import NewGameScreen from './game/game-screen';
import {getData} from './data';

const RouteID = {
  INTRO: ``,
  WELCOME: `start`,
  GAME: `game`,
  SCOREBOARD: `scores`
};

class Application {
  constructor() {
    this.imgs = {};
    this.init();
  }

  init() {
    this.routes = {
      [RouteID.INTRO]: IntroScreen,
      [RouteID.WELCOME]: WelcomeScreen,
      [RouteID.SCOREBOARD]: StatsScreen,
      [RouteID.GAME]: new NewGameScreen(getData().levels)
    };

    window.onhashchange = () => {
      this.changeRoute(location.hash.replace(`#`, ``));
    };

    this.showIntro();
  }

  changeRoute(route = ``) {
    this.routes[route].init();
  }

  fillListImg() {
    const imgs = getData().levels.reduce((r, level) => {
      level.pictures.forEach((img) => {
        r[img.url] = img.type;
      });
      return r;
    }, {});
    return imgs;
  }

  showIntro() {
    location.hash = RouteID.INTRO;
    this.imgs = this.fillListImg();
  }

  showWelcome() {
    location.hash = RouteID.WELCOME;
  }

  showRules() {
    RulesScreen.init();
  }

  showStats(state) {
    const newStats = new StatsScreen(state);
    newStats.init();
  }

  showGame() {
    location.hash = RouteID.GAME;
  }

}

export default new Application();
