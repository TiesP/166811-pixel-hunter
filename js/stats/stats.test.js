import assert from 'assert';
import {getStat, getStats} from './stats';

describe(`Stats`, () => {

  it(`getStat`, () => {
    assert.equal(getStat(true, 9), `fast`);
  });

  it(`getStats 3`, () => {
    const answers = [{correct: true, time: 9}, {correct: true, time: 10}, {correct: true, time: 21}];
    assert.deepEqual(getStats(answers), [`fast`, `correct`, `slow`]);
  });

  it(`getStats 3 --- 5`, () => {
    const answers = [{correct: true, time: 9}, {correct: true, time: 10}, {correct: true, time: 21}];
    assert.deepEqual(getStats(answers, 5), [`fast`, `correct`, `slow`, `unknown`, `unknown`]);
  });

});
