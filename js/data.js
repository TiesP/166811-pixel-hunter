const data = Object.freeze({
  'types': {
    onePicture: {
      title: `Угадай, фото или рисунок?`,
      className: `game__content--wide`
    },
    twoPicture: {
      title: `Угадайте для каждого изображения фото или рисунок?`,
      className: ``
    },
    threePicture: {
      title: `Найдите рисунок среди изображений`,
      className: `game__content--triple`
    }
  },
  'initialState': {
    curLevel: 0,
    lives: 3,
    time: 0
  },
  'rules': {
    correctAnswerPoints: 100,
    addPoints: [
      {time: 9, points: 50, type: `fast`},
      {time: 20, points: 0, type: `correct`},
      {time: 30, points: -50, type: `slow`}
    ],
    remainingLifePoints: 50,
    timer: 30
  }
});

export function getData() {
  return data;
}

const state = {};

export function getState() {
  return state;
}

export function fillListImg(levels) {
  const imgs = levels.reduce((r, level) => {
    level.pictures.forEach((img) => {
      r[img.url] = {type: img.type};
    });
    return r;
  }, {});

  state.imgs = imgs;
}
