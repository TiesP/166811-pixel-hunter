import RulesView from './rules-view';
import {changeView} from '../utils';
import App from '../main';

class Intro {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      App.showGame();
    };

    this.view.onPrevScreen = () => {
      App.showGreeting();
    };

    this.view.onChangeName = (rulesButton, val) => {
      rulesButton.disabled = !val;
    };
  }

}

export default new Intro();
