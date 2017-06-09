import {getElementFromTemplate, changePageTemplate} from './utils.js';
import greeting from './greeting';
import footer from './components/footer';

const moduleIntro = getElementFromTemplate(`
<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
${footer}
`);

const intro = moduleIntro.querySelector(`.intro__asterisk`);
intro.addEventListener(`click`, () => {
  changePageTemplate(greeting);
});

export default moduleIntro;
