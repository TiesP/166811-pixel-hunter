import assert from 'assert';
import {getState} from './data';
import {reduceLives, newGame, addAnswer, checkBonus, fillResults, nextLevel} from './game';

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

  describe(`Answers`, () => {

    it(`add 1 answer`, () => {
      newGame();
      const state = getState();
      assert.equal(state.answers.length, 0);
      const newState = addAnswer(state, 20, true);
      assert.equal(newState.answers.length, 1);
    });

    it(`add 10 answer`, () => {
      newGame();
      let state = getState();
      assert.equal(state.answers.length, 0);
      for (let i = 1; i <= 10; i++) {
        state = addAnswer(state, i * 3, true);
      }
      assert.equal(state.answers.length, 10);
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
      newGame();
      let state = getState();
      state = addAnswer(state, 8, true);
      state = fillResults(state);
      assert.equal(state.result.total, 150);
    });

    it(`3 quick answer - check total`, () => {
      newGame();
      let state = getState();
      state = addAnswer(state, 3, false);
      state = addAnswer(state, 6, true);
      state = addAnswer(state, 9, false);
      state = fillResults(state);
      assert.equal(state.result.total, 150);
    });

    it(`10 different answer - check total`, () => {
      newGame();
      let state = getState();
      for (let i = 1; i <= 10; i++) {
        state = addAnswer(state, i * 3, (i % 2) ? false : true);
      }
      state = fillResults(state);
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
      assert.equal(state.result.total, 0 + 150 + 0 + 100 + 0 + 100 + 0 + (100 - 50) + 0 + (100 - 50));
    });

  });

});
