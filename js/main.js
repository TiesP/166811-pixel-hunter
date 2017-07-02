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
  RULES: `rules`,
  GAME: `game`,
  SCOREBOARD: `stats`
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
      [RouteID.RULES]: RulesScreen,
      [RouteID.SCOREBOARD]: new StatsScreen(),
      [RouteID.GAME]: new NewGameScreen(getData().levels)
    };

    window.addEventListener(`hashchange`, () => {
      this.changeRoute(location.hash.replace(`#`, ``));
    });

    this.imgs = this.fillListImg();
    this.changeRoute(location.hash.replace(`#`, ``));
  }

  changeRoute(route = ``) {
    const arrHash = route.split(`=`, 2);
    this.routes[arrHash[0]].init();
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
  }

  showWelcome() {
    location.hash = RouteID.WELCOME;
  }

  showRules() {
    location.hash = RouteID.RULES;
  }

  showStats(state) {
    const param = encodeURIComponent(JSON.stringify(state));
    location.hash = `${RouteID.SCOREBOARD}=${param}`;
  }

  showGame() {
    location.hash = RouteID.GAME;
  }

}

export default new Application();
