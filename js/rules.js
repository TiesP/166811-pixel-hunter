import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting} from './utils.js';
import footer from './components/footer';
import header from './components/header';
import game from './game';
import {setState} from './data';

const moduleRules = getElementFromTemplate(`
${header()}
<div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>
${footer}
`);

const rulesButton = moduleRules.querySelector(`.rules__button`);
rulesButton.addEventListener(`click`, () => {
  setState(`curLevel`, 0);
  changePageTemplate(game);
});

const rulesInput = moduleRules.querySelector(`.rules__input`);
rulesInput.addEventListener(`input`, (event) => {
  if (event.currentTarget.value) {
    rulesButton.disabled = false;
  } else {
    rulesButton.disabled = true;
  }
});

export default addHandlerBackGreeting(moduleRules);
