import AbstractView from '../view';
import footer from '../components/footer';
import header from '../components/header';
import {getData} from '../data';

export default class IntroView extends AbstractView {

  get template() {
    return `
    ${header()}
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится ${getData().rules.timer} секунд.<br>
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
    `;
  }

  bind() {
    const rulesButton = this.element.querySelector(`.rules__button`);
    rulesButton.addEventListener(`click`, () => {
      this.onNextScreen();
    });

    this.element.querySelector(`.back`)
      .addEventListener(`click`, () => {
        this.onPrevScreen();
      });

    this.element.querySelector(`.rules__input`)
      .addEventListener(`input`, (event) => {
        this.onChangeName(rulesButton, event.currentTarget.value);
      });
  }

  onNextScreen() {

  }

  onPrevScreen() {

  }

  onChangeName() {

  }

}
