import assert from 'assert';
import {getState} from './data';
import {reduceLives, newGame, addAnswer, checkBonus, fillResults, nextLevel, addBonus, getStats} from './game';

describe(`Game`, () => {

  describe(`Levels`, () => {

    it(`should be level change to 1`, () => {
      newGame();
      const newState = nextLevel(getState());
      assert.equal(1, newState.curLevel);
    });

    it(`should be level 0`, () => {
      newGame();
      assert.equal(0, getState().curLevel);
    });

  });

  describe(`Character lives`, () => {

    it(`reduce Lives`, () => {
      newGame();
      const lives = getState().lives;
      const newState = reduceLives(getState());
      assert.equal(newState.lives, lives - 1);
    });

    it(`new game must 3 Lives`, () => {
      newGame();
      assert.equal(getState().lives, 3);
    });

  });

  describe(`Stats`, () => {

    it(`getStats`, () => {
      assert.equal(getStats(9, true), `fast`);
    });

    it(`add 1 answer`, () => {
      let state = {};
      state = addAnswer(state, 9, true);
      assert.deepEqual(state.stats, [`fast`]);
    });

  });

  describe(`Answers`, () => {

    it(`add 1 answer`, () => {
      let state = {};
      state = addAnswer(state, 20, true);
      assert.equal(state.answers.length, 1);
    });

    it(`add 10 answer`, () => {
      let state = {};
      for (let i = 1; i <= 10; i++) {
        state = addAnswer(state, i * 3, true);
      }
      assert.equal(state.answers.length, 10);
    });

  });

  describe(`Bonuses`, () => {

    it(`add first bonus`, () => {
      const bonuses = {};
      addBonus(bonuses, 50, `fast`);
      assert.deepEqual(bonuses, {fast: {count: 1, points: 50}});
    });

    it(`add 2 dif bonus`, () => {
      const bonuses = {};
      addBonus(bonuses, 50, `fast`);
      addBonus(bonuses, 50, `fast`);
      addBonus(bonuses, -50, `slow`);
      assert.deepEqual(bonuses, {fast: {count: 2, points: 50}, slow: {count: 1, points: -50}});
    });

    it(`add null bonus`, () => {
      const bonuses = {};
      addBonus(bonuses, 0);
      assert.deepEqual(bonuses, {});
    });

  });

  describe(`Results`, () => {
    it(`quick correct answer - check bonus`, () => {
      assert.equal(checkBonus(9), 50);
    });

    it(`normal (10) correct answer - check bonus`, () => {
      assert.equal(checkBonus(10), 0);
    });

    it(`normal (20) correct answer - check bonus`, () => {
      assert.equal(checkBonus(20), 0);
    });

    it(`slow (21) correct answer - check bonus`, () => {
      assert.equal(checkBonus(21), -50);
    });

    it(`slow (30) correct answer - check bonus`, () => {
      assert.equal(checkBonus(30), -50);
    });

    it(`1 quick correct answer - check total`, () => {
      let state = {};
      state = addAnswer(state, 8, true);
      const result = fillResults(state);
      assert.equal(result.total, 100);
      assert.deepEqual(result.bonuses, {fast: {count: 1, points: 50}});
    });

    it(`3 quick answer - check total`, () => {
      let state = {};
      state = addAnswer(state, 3, false);
      state = addAnswer(state, 6, true);
      state = addAnswer(state, 9, false);
      const result = fillResults(state);
      assert.equal(result.total, 100);
      assert.deepEqual(result.bonuses, {fast: {count: 1, points: 50}});
    });

    it(`10 different answer - check total`, () => {
      let state = {};
      for (let i = 1; i <= 10; i++) {
        state = addAnswer(state, i * 3, (i % 2) ? false : true);
      }
      assert.deepEqual(state.stats, [`wrong`, `fast`, `wrong`, `correct`, `wrong`, `correct`, `wrong`, `slow`, `wrong`, `slow`]);
      const result = fillResults(state);
      // 3 false
      // 6 true
      // 9 false
      // 12 true
      // 15 false
      // 18 true
      // 21 false
      // 24 true
      // 27 false
      // 30 true
      assert.equal(result.total, 500);
      assert.deepEqual(result.bonuses, {fast: {count: 1, points: 50}, slow: {count: 2, points: -50}});
      assert.deepEqual(result.stats, [`wrong`, `fast`, `wrong`, `correct`, `wrong`, `correct`, `wrong`, `slow`, `wrong`, `slow`]);
    });

  });

});
