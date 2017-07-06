import AbstractView from '../view';
import footer from '../components/footer';
import header from '../components/header';
import getListStats from '../components/lineStats';
import {getData, GameType} from '../data';

export default class GameView extends AbstractView {

  constructor(props) {
    super(props);
    this.lives = props.lives;
    this.level = props.level;
  }

  get template() {
    return `
    ${header({
      lives: this.lives,
      timer: this.getTime
    })}
    ${this._getLevelTemplate(this.level)}
    ${footer}
   `;
  }

  setTime(time) {
    this.element.querySelector(`.game__timer`).innerText = time;
  }

  blink() {
    if (!this._timer) {
      this._timer = this.element.querySelector(`.game__timer`);
    }
    this._timer.style.color = (this._timer.style.color === `red`) ? `black` : `red`;
  }

  setStats(stats) {
    this.element.querySelector(`div.stats`).innerHTML = getListStats(stats);
  }

  _setProportions(item) {
    const width = parseInt(getComputedStyle(item.parentNode, ``).width, 10);
    const height = parseInt(getComputedStyle(item.parentNode, ``).height, 10);
    if (item.naturalWidth / item.naturalHeight > width / height) {
      item.width = width;
    } else {
      item.height = height;
    }
  }

  _getLevelTemplate(level) {
    return `
       <div class="game">
        <p class="game__task">${getData().types[level.type].title}</p>
        <form class="game__content ${getData().types[level.type].className}">
          ${this._getOptionResults(level.pictures, level.type)}
        </form>
        <div class="stats">
        </div>
      </div>
     `;
  }

  _getOptionResults(arr, type) {
    return arr.reduce((r, item, i) => {
      return `${r} <div class="game__option" ${(type === GameType.ONE_OF_THREE) ? `data-url="${item.url}"` : ``}>
      <img src=${item.url} alt="Option ${i + 1}">
      ${this._getLabels(type, i, item.url)}
      </div>`;
    }, ``);
  }

  _getLabels(type, i, urlImg) {
    if (type === GameType.ONE_OF_THREE) {
      return ``;
    } else {
      return `
      <label class="game__answer  game__answer--photo">
        <input name="question${i + 1}" type="radio" value="photo" data-url="${urlImg}">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question${i + 1}" type="radio" value="painting" data-url="${urlImg}">
        <span>Рисунок</span>
      </label>
      `;
    }
  }

  bind() {
    this.element.querySelector(`.back`)
      .addEventListener(`click`, () => {
        this.onPrevScreen();
      });

    switch (this.level.type) {
      case GameType.TWO_OF_TWO:
        Array.from(this.element.querySelectorAll(`.game__option input`))
          .forEach((item) => {
            item.addEventListener(`change`, () => {
              this.checkAnswer(item);
            });
          });
        break;
      case GameType.TINDER:
        Array.from(this.element.querySelectorAll(`.game__option input`))
          .forEach((item) => {
            item.addEventListener(`click`, () => {
              this.checkAnswer(item);
            });
          });
        break;
      case GameType.ONE_OF_THREE:
        Array.from(this.element.querySelectorAll(`.game__option`))
          .forEach((item) => {
            item.addEventListener(`mousedown`, (event) => {
              if (event.which === 1) {
                this.checkAnswer(item);
              }
            });
          });
        break;
    }

    Array.from(this.element.querySelectorAll(`.game__option img`))
      .forEach((item) => {
        item.addEventListener(`load`, () => {
          this._setProportions(item);
        });
      });

    const timer = this.element.querySelector(`.game__timer`);
    timer.style.transitionProperty = `color`;
    timer.style.transitionDuration = `1s`;

  }

  onPrevScreen() {}

  checkAnswer(item) {}

}
