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
          return {type: that.getType(item.type), pictures: that.getPictures(item.answers)};
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

  getPictures(answers) {
    return answers.map((answer) => {
      return {
        type: (answer.type === `painting`) ? `paint` : answer.type,
        url: answer.image.url
      };
    });
  }

  getType(apiType) {
    if (apiType === `two-of-two`) {
      return `twoPicture`;
    } else if (apiType === `tinder-like`) {
      return `onePicture`;
    } else if (apiType === `one-of-three`) {
      return `threePicture`;
    }
    return ``;
  }

  _setup(levels) {
    this.routes = {
      [RouteID.WELCOME]: WelcomeScreen,
      [RouteID.RULES]: RulesScreen,
      [RouteID.SCOREBOARD]: new StatsScreen(),
      [RouteID.GAME]: new NewGameScreen(levels)
    };

    window.addEventListener(`hashchange`, () => {
      this.changeRoute(location.hash.replace(`#`, ``));
    });

    this.changeRoute(location.hash.replace(`#`, ``));
  }

  changeRoute(route = ``) {
    const arrHash = route.split(`=`, 2);
    this.routes[arrHash[0]].init();
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

}

export default new Application();
