import assert from 'assert';
import {getStat, getStats} from './stats';
import {GameType, StatsType} from '../data';

describe(`Stats`, () => {

  it(`getStat`, () => {
    assert.equal(getStat(true, 9), StatsType.FAST);
  });

  it(`getStats 3`, () => {
    const answers = [{correct: true, time: 9}, {correct: true, time: 10}, {correct: true, time: 21}];
    assert.deepEqual(getStats(answers), [StatsType.FAST, StatsType.CORRECT, StatsType.SLOW]);
  });

  it(`getStats 3 --- 5`, () => {
    const answers = [{correct: true, time: 9}, {correct: true, time: 10}, {correct: true, time: 21}];
    assert.deepEqual(getStats(answers, 5), [StatsType.FAST, StatsType.CORRECT, StatsType.SLOW, StatsType.UNKNOWN, StatsType.UNKNOWN]);
  });

  it(`вычисляемые свойства объекта`, () => {

    const mustBe = {
      'types': {
        'tinder-like': {
          className: `game__content--wide`
        },
        'two-of-two': {
          className: ``
        },
        'one-of-three': {
          className: `game__content--triple`
        }
      }
    };

    const obj = {
      'types': {
        [GameType.TINDER]: {
          className: `game__content--wide`
        },
        [GameType.TWO_OF_TWO]: {
          className: ``
        },
        [GameType.ONE_OF_THREE]: {
          className: `game__content--triple`
        }
      }
    };

    assert.deepEqual(obj, mustBe);
  });

});
