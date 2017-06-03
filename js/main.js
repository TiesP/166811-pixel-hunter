import {changePageTemplate} from './utils.js';
import greeting from './greeting';

const intro = document.querySelector(`.intro__asterisk`);
intro.addEventListener(`click`, () => {
  changePageTemplate(greeting);
});
