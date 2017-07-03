import IntroScreen from './intro/intro-screen';
import WelcomeScreen from './welcome/welcome-screen';
import RulesScreen from './rules/rules-screen';
import StatsScreen from './stats/stats-screen';
import NewGameScreen from './game/game-screen';
import {loadData} from './api';
import {fillListImg} from './data';

const RouteID = {
  WELCOME: ``,
  RULES: `rules`,
  GAME: `game`,
  SCOREBOARD: `stats`
};

class Application {
  constructor() {
    this.init();
  }

  init() {
    IntroScreen.init();
    const that = this;
    loadData()
      .then((data) => {
        return data.map((item) => {
          return {type: item.type, pictures: that._getPictures(item.answers)};
        });
      })
      .then((levels) => {
        fillListImg(levels);
        return levels;
      })
      .then((levels) => {
        that._setup(levels);
      });
  }


  showWelcome() {
    location.hash = RouteID.WELCOME;
  }

  showRules() {
    location.hash = RouteID.RULES;
  }

  showStats(state = {answers: [], lives: 0}) {
    const param = encodeURIComponent(JSON.stringify(state));
    location.hash = `${RouteID.SCOREBOARD}=${param}`;
  }

  showGame() {
    location.hash = RouteID.GAME;
  }

  _getPictures(answers) {
    return answers.map((answer) => {
      return {
        type: answer.type,
        url: answer.image.url
      };
    });
  }

  _setup(levels) {
    this.routes = {
      [RouteID.WELCOME]: WelcomeScreen,
      [RouteID.RULES]: RulesScreen,
      [RouteID.SCOREBOARD]: new StatsScreen(),
      [RouteID.GAME]: new NewGameScreen(levels)
    };

    window.addEventListener(`hashchange`, () => {
      this._changeRoute(location.hash.replace(`#`, ``));
    });

    this._changeRoute(location.hash.replace(`#`, ``));
  }

  _changeRoute(route = ``) {
    const arrHash = route.split(`=`, 2);
    this.routes[arrHash[0]].init();
  }

}

export default new Application();
