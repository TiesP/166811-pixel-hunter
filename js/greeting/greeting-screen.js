import GreetingView from './greeting-view';
import {changeView} from '../utils';
import Application from '../main';

class GreetingScreen {
  constructor() {
    this.view = new GreetingView();
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

export default new GreetingScreen();
