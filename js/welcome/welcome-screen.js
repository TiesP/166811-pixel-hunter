import WelcomeView from './welcome-view';
import {changeView} from '../utils';
import Application from '../application';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      Application.showRules();
    };

    this.view.onStatsScreen = () => {
      Application.showStats();
    };
  }

}

export default new WelcomeScreen();
