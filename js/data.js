export default function makeData() {
  return Object.freeze({
    'game-1': {
      type: `guessPhotoDrawing`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`],
      pictures: [
        {url: `https://k42.kn3.net/CF42609C8.jpg`, isPhoto: false, width: 468, height: 458},
        {url: `http://i.imgur.com/1KegWPz.jpg`, isPhoto: true, width: 468, height: 458}
      ],
      lives: 2,
      timer: `NN`
    },
    'game-2': {
      type: `guessPhotoDrawing`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      pictures: [
        {url: `https://k42.kn3.net/D2F0370D6.jpg`, isPhoto: false, width: 705, height: 455}
      ],
      lives: 2,
      timer: `NN`
    },
    'game-3': {
      type: `findDrawing`,
      stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      pictures: [
        {url: `https://i.imgur.com/DiHM5Zb.jpg`, isPhoto: true, width: 304, height: 455},
        {url: `http://i.imgur.com/DKR1HtB.jpg`, isPhoto: true, width: 304, height: 455, selected: true},
        {url: `https://k32.kn3.net/5C7060EC5.jpg`, isPhoto: false, width: 304, height: 455}
      ],
      lives: 2,
      timer: `NN`
    },
    'results': [
      {
        totalFinal: 950,
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
        totalFinal: 0,
        stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `wrong`, `fast`, `wrong`],
      },
      {
        totalFinal: 950,
        total: 900,
        points: 100,
        stats: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
        bonuses: [
          {type: `heart`, count: 2, points: 50}
        ]
      }
    ]
  });
}
