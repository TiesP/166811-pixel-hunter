export const GameType = {
  TINDER: `tinder-like`,
  TWO_OF_TWO: `two-of-two`,
  ONE_OF_THREE: `one-of-three`
};

export const StatsType = {
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`,
  SLOW: `slow`,
  HEART: `heart`,
  UNKNOWN: `unknown`
};

const data = Object.freeze({
  'types': {
    [GameType.TINDER]: {
      className: `game__content--wide`
    },
    [GameType.TWO_OF_TWO]: {
      className: ``
    },
    [GameType.ONE_OF_THREE]: {
      question: {
        'Найдите рисунок среди изображений': `painting`,
        'Найдите фото среди изображений': `photo`
      },
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
      {time: 9, points: 50, type: StatsType.FAST},
      {time: 20, points: 0, type: StatsType.CORRECT},
      {time: 30, points: -50, type: StatsType.SLOW}
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
