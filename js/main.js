import 'babel-polyfill';
import 'whatwg-fetch';
import IntroScreen from './intro/intro-screen';
import WelcomeScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import StatsScreen from './stats/stats-screen';
import NewGameScreen from './game/game-screen';
import {getData} from './data';

const RouteID = {
  WELCOME: ``,
  RULES: `rules`,
  GAME: `game`,
  SCOREBOARD: `stats`
};

class Application {
  constructor() {
    this.imgs = {};
    this.loadData();
  }

  loadData() {
    IntroScreen.init();

    const DATA_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions`;
    const that = this;
    fetch(DATA_URL)
      .then(function (resp) {
        const lev = resp.json();
        return lev;
      })
      .then(function (data) {
        const levels = data.map((item) => {
          return {type: that.getType(item.type), pictures: that.getPictures(item.answers)};
        });
        that.init(levels);
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

  init(levels) {
    this.routes = {
      [RouteID.WELCOME]: WelcomeScreen,
      [RouteID.RULES]: RulesScreen,
      [RouteID.SCOREBOARD]: new StatsScreen(),
      [RouteID.GAME]: new NewGameScreen(levels)
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
