import AbstractView from '../view';
import footer from '../components/footer';
import header from '../components/header';
import lineStats from '../components/lineStats';
import {getData} from '../data';

export default class GameView extends AbstractView {

  constructor(props) {
    super(props);
    this.lives = props.lives;
    // this.timer = props.timer;
    this.level = props.level;
    this.stats = props.stats;
  }

  get template() {
    return `
    ${header({
      lives: this.lives,
      timer: this.getTime
    })}
    ${this.getLevelTemplate(this.level)}
    ${footer}
   `;
  }

  bind() {
    this.element.querySelector(`.back`)
      .addEventListener(`click`, () => {
        this.onPrevScreen();
      });

    if (this.level.type === `twoPicture`) {
      Array.from(this.element.querySelectorAll(`.game__option input`))
        .forEach((item) => {
          item.addEventListener(`change`, (event) => {
            this.checkAnswer(item);
          });
        });
    } else if (this.level.type === `onePicture`) {
      Array.from(this.element.querySelectorAll(`.game__option input`))
        .forEach((item) => {
          item.addEventListener(`click`, (event) => {
            this.checkAnswer(item);
          });
        });
    } else if (this.level.type === `threePicture`) {
      Array.from(this.element.querySelectorAll(`.game__option`))
        .forEach((item) => {
          item.addEventListener(`mousedown`, (event) => {
            if (event.which === 1) {
              this.checkAnswer(item);
            }
          });
        });
    }

    Array.from(this.element.querySelectorAll(`.game__option img`))
      .forEach((item) => {
        item.addEventListener(`load`, (event) => {
          this.setProportions(item);
        });
      });

  }

  setTime(time) {
    this.element.querySelector(`.game__timer`).innerText = time;
  }

  onPrevScreen() {}

  checkAnswer(item) {}

  setProportions(item) {
    const width = parseInt(getComputedStyle(item.parentNode, ``).width, 10);
    const height = parseInt(getComputedStyle(item.parentNode, ``).height, 10);
    if (item.naturalWidth / item.naturalHeight > width / height) {
      item.width = width;
    } else {
      item.height = height;
    }
  }

  getLevelTemplate(level) {
    return `
       <div class="game">
        <p class="game__task">${getData().types[level.type].title}</p>
        <form class="game__content ${getData().types[level.type].className}">
          ${this.getOptionResults(level.pictures, level.type)}
        </form>
        ${lineStats(this.stats)}
      </div>
     `;
  }

  getOptionResults(arr, type) {
    return arr.reduce((r, item, i) => {
      return `${r} <div class="game__option" ${(type === `threePicture`) ? `data-url="${item.url}"` : ``}>
      <img src=${item.url} alt="Option ${i + 1}">
      ${this.getLabels(type, i, item.url)}
      </div>`;
    }, ``);
  }

  getLabels(type, i, urlImg) {
    if (type === `threePicture`) {
      return ``;
    } else {
      return `
      <label class="game__answer  game__answer--photo">
        <input name="question${i + 1}" type="radio" value="photo" data-url="${urlImg}">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question${i + 1}" type="radio" value="paint" data-url="${urlImg}">
        <span>Рисунок</span>
      </label>
      `;
    }
  }

}
