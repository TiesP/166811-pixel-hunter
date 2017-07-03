import IntroView from './intro-view';
import {changeView} from '../utils';
import Application from '../application';

class IntroScreen {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      Application.showWelcome();
    };
  }

}

export default new IntroScreen();
