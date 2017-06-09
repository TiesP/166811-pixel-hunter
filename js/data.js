export function getData(key) {
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
    ]
  });

  if (key) {
    return data[key];
  } else {
    return data;
  }
}

const state = {
  curLevel: 0,
  lives: 2,
  timer: `NN`
};

export function getState() {
  return state;
}

export function setState(curKey, newValue) {
  state[curKey] = newValue;
}
