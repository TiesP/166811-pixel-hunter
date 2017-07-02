import 'babel-polyfill';
import 'whatwg-fetch';
import IntroScreen from './intro/intro-screen';
import WelcomeScreen from './greeting/greeting-screen';
import RulesScreen from './rules/rules-screen';
import StatsScreen from './stats/stats-screen';
import NewGameScreen from './game/game-screen';

const RouteID = {
  WELCOME: ``,
  RULES: `rules`,
  GAME: `game`,
  SCOREBOARD: `stats`
};

const SERVER_URL = `https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter`;

class Application {
  constructor() {
    this.imgs = {};
    this.levels = [];
    this.loadData();
  }

  loadData() {
    IntroScreen.init();

    const that = this;
    fetch(`${SERVER_URL}/questions`)
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

  getResults() {
    return fetch(`${SERVER_URL}/stats/${this.name}`)
      .then(function (resp) {
        const lev = resp.json();
        return lev;
      });
  }

  saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    fetch(`${SERVER_URL}/stats/${this.name}`, requestSettings)
      .then((resp) => {
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

    this.levels = levels;
    this.imgs = this.fillListImg();
    this.changeRoute(location.hash.replace(`#`, ``));
  }

  setName(name) {
    this.name = name;
  }

  changeRoute(route = ``) {
    const arrHash = route.split(`=`, 2);
    this.routes[arrHash[0]].init();
  }

  fillListImg() {
    const imgs = this.levels.reduce((r, level) => {
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

  showStats(state = {answers: [], lives: 0}) {
    const param = encodeURIComponent(JSON.stringify(state));
    location.hash = `${RouteID.SCOREBOARD}=${param}`;
  }

  showGame() {
    location.hash = RouteID.GAME;
  }

}

export default new Application();
