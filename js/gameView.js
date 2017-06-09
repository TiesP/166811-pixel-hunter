import footer from './components/footer';
import header from './components/header';
import getLineStats from './components/lineStats';

export default function getGameTemplate(level, state) {
  return `
    ${header(state)}
    ${getLevelTemplate(level)}
    ${footer}
  `;
}

function getLevelTemplate(level) {
  let title;
  let className = ``;
  let width;
  let height;
  if (level.type === `threePicture`) {
    title = `Найдите рисунок среди изображений`;
    className = `game__content--triple`;
    width = 468;
    height = 458;
  } else if (level.type === `onePicture`) {
    title = `Угадай, фото или рисунок?`;
    className = `game__content--wide`;
    width = 705;
    height = 455;
  } else if (level.type === `twoPicture`) {
    title = `Угадайте для каждого изображения фото или рисунок?`;
    width = 304;
    height = 455;
  }

  return `
     <div class="game">
      <p class="game__task">${title}</p>
      <form class="game__content ${className}">
        ${getOptionResults(level.pictures, level.type, width, height)}
      </form>
      ${getLineStats(level.stats)}
    </div>
   `;
}

function getOptionResults(arr, type, width, height) {
  return arr.reduce((r, item, i) => {
    return r + `
      <div class="game__option">
        <img src=${item.url} alt="Option ${i + 1}" width="${width}" height="${height}">
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
