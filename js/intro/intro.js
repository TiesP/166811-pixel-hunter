import IntroView from './intro-view';
import {changeView} from '../utils';
import App from '../main';

class Intro {
  constructor() {
    this.view = new IntroView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      App.showGreeting();
    };
  }

}

export default new Intro();
