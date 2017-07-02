const data = Object.freeze({
  'levels': [
    {
      type: `twoPicture`,
      pictures: [
        {type: `photo`, url: `https://k61.kn3.net/C/0/F/0/8/F/B2D.jpg`},
        {type: `paint`, url: `https://k61.kn3.net/4/3/D/8/0/2/6DA.jpg`}
      ]
    },
    {
      type: `twoPicture`,
      pictures: [
        {type: `paint`, url: `https://k60.kn3.net/5/E/E/A/3/3/59D.jpg`},
        {type: `photo`, url: `https://k61.kn3.net/5/6/A/3/3/F/266.jpg`}
      ]
    },
    {
      type: `twoPicture`,
      pictures: [
        {type: `photo`, url: `https://k60.kn3.net/5/1/1/5/2/9/DBC.jpg`},
        {type: `paint`, url: `https://k60.kn3.net/F/3/C/5/A/6/E29.jpg`}
      ]
    },
    {
      type: `twoPicture`,
      pictures: [
        {type: `paint`, url: `https://k42.kn3.net/CF42609C8.jpg`},
        {type: `photo`, url: `http://i.imgur.com/1KegWPz.jpg`}
      ]
    },
    {
      type: `threePicture`,
      pictures: [
        {type: `photo`, url: `https://k60.kn3.net/6/6/2/8/8/6/5BC.jpg`},
        {type: `photo`, url: `https://k60.kn3.net/1/6/9/9/B/F/BCF.jpg`},
        {type: `paint`, url: `https://k60.kn3.net/5/7/7/8/A/0/CC2.jpg`}
      ]
    },
    {
      type: `onePicture`,
      pictures: [
        {type: `photo`, url: `https://k60.kn3.net/0/F/E/3/B/F/2A4.jpg`}
      ]
    },
    {
      type: `onePicture`,
      pictures: [
        {type: `paint`, url: `https://k61.kn3.net/0/0/0/6/F/6/E02.jpg`}
      ]
    },
    {
      type: `onePicture`,
      pictures: [
        {type: `paint`, url: `https://k60.kn3.net/0/B/B/E/C/E/F63.jpg`}
      ]
    },
    {
      type: `onePicture`,
      pictures: [
        {type: `paint`, url: `https://k42.kn3.net/D2F0370D6.jpg`}
      ]
    },
    {
      type: `threePicture`,
      pictures: [
        {type: `photo`, url: `https://i.imgur.com/DiHM5Zb.jpg`},
        {type: `photo`, url: `http://i.imgur.com/DKR1HtB.jpg`},
        {type: `paint`, url: `https://k32.kn3.net/5C7060EC5.jpg`}
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
      bonuses: {
        fast: {count: 1, points: 50},
        heart: {count: 2, points: 50},
        slow: {count: 2, points: -50}
      }
    },
    {
      total: 0,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`],
    },
    {
      total: 900,
      points: 100,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      bonuses: {
        heart: {count: 2, points: 50}
      }
    }
  ],
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
