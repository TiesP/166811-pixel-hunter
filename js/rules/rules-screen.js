import RulesView from './rules-view';
import {changeView} from '../utils';
import Application from '../main';

class RulesScreen {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      Application.showGame();
    };

    this.view.onPrevScreen = () => {
      Application.showWelcome();
    };

    this.view.onChangeName = (rulesButton, val) => {
      rulesButton.disabled = !val;
      Application.setName(val);
    };
  }

}

export default new RulesScreen();
