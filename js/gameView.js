import footer from './components/footer';
import header from './components/header';
import getLineStats from './components/lineStats';
import {getData} from './data';

export default function getGameTemplate(level, state) {
  return `
    ${header(state)}
    ${getLevelTemplate(level)}
    ${footer}
  `;
}

function getLevelTemplate(level) {
  return `
     <div class="game">
      <p class="game__task">${getData().types[level.type].title}</p>
      <form class="game__content ${getData().types[level.type].className}">
        ${getOptionResults(level.pictures, level.type)}
      </form>
      ${getLineStats(level.stats)}
    </div>
   `;
}

function getOptionResults(arr, type) {
  return arr.reduce((r, item, i) => {
    return r + `
      <div class="game__option">
        <img src=${item.url} alt="Option ${i + 1}">
        ${getLabels(type, i)}
      </div>
    `;
  }, ``);
}

function getLabels(type, i) {
  if (type === `threePicture`) {
    return ``;
  } else {
    return `
    <label class="game__answer  game__answer--photo">
      <input name="question${i + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question${i + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
    `;
  }
}
