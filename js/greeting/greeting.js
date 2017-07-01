import GreetingView from './greeting-view';
import {changeView} from '../utils';
import App from '../main';

class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    changeView(this.view);

    this.view.onNextScreen = () => {
      App.showRules();
    };
  }

}

export default new Greeting();
