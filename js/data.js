const data = Object.freeze({
  'levels': [
    {
      type: `twoPicture`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
      pictures: [
        {isPhoto: false, url: `https://k42.kn3.net/CF42609C8.jpg`},
        {isPhoto: true, url: `http://i.imgur.com/1KegWPz.jpg`}
      ]
    },
    {
      type: `onePicture`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      pictures: [
        {isPhoto: false, url: `https://k42.kn3.net/D2F0370D6.jpg`}
      ]
    },
    {
      type: `threePicture`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      pictures: [
        {isPhoto: true, url: `https://i.imgur.com/DiHM5Zb.jpg`},
        {isPhoto: true, url: `http://i.imgur.com/DKR1HtB.jpg`},
        {isPhoto: false, url: `https://k32.kn3.net/5C7060EC5.jpg`}
      ]
    }
  ],
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
  'results': [
    {
      total: 900,
      points: 100,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      bonuses: [
        {type: `fast`, count: 1, points: 50},
        {type: `heart`, count: 2, points: 50},
        {type: `slow`, count: 2, points: -50}
      ]
    },
    {
      total: 0,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`],
    },
    {
      total: 900,
      points: 100,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      bonuses: [
        {type: `heart`, count: 2, points: 50}
      ]
    }
  ],
  'initialState': {
    curLevel: 0,
    lives: 3,
    timer: 30,
    answers: []
  },
  'rules': {
    correctAnswerPoints: 100,
    additionalPoints: [{time: 9, points: 50}, {time: 20, points: 0}, {time: 30, points: -50}],
    remainingLifePoints: 50
  }
});

export function getData() {
  return data;
}

let state;
setState(getData().initialState);

export function getState() {
  return state;
}

export function setState(newValue, key) {
  if (key) {
    state[key] = newValue;
  } else {
    state = Object.assign({}, newValue);
  }
}
