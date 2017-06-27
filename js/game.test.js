import assert from 'assert';
import {getState} from './data';
import {reduceLives, newGame, addAnswer, checkBonus, fillResults} from './game';

describe(`Game`, () => {
  describe(`Character lives`, () => {

    it(`reduce Lives`, () => {
      const lives = getState().lives;
      reduceLives();
      assert.equal(getState().lives, lives - 1);
    });

    it(`new game must 3 Lives`, () => {
      newGame();
      assert.equal(getState().lives, 3);
    });

  });

  describe(`Answers`, () => {

    it(`add 1 answer`, () => {
      newGame();
      assert.equal(getState().answers.length, 0);
      addAnswer(20, true);
      assert.equal(getState().answers.length, 1);
    });

    it(`add 10 answer`, () => {
      newGame();
      assert.equal(getState().answers.length, 0);
      for (let i = 1; i <= 10; i++) {
        addAnswer(i * 3, true);
      }
      assert.equal(getState().answers.length, 10);
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
      addAnswer(8, true);
      fillResults();
      assert.equal(getState().result.total, 150);
    });

    it(`3 quick answer - check total`, () => {
      newGame();
      addAnswer(3, false);
      addAnswer(6, true);
      addAnswer(9, false);
      fillResults();
      assert.equal(getState().result.total, 150);
    });

    it(`2 normal correct answer - check total`, () => {
      newGame();
      addAnswer(12, true);
      addAnswer(18, true);
      fillResults();
      assert.equal(getState().result.total, 200);
    });

    it(`3 normal answer - check total`, () => {
      newGame();
      addAnswer(12, true);
      addAnswer(15, false);
      addAnswer(18, true);
      fillResults();
      assert.equal(getState().result.total, 200);
    });

    it(`10 different answer - check total`, () => {
      newGame();
      for (let i = 1; i <= 10; i++) {
        addAnswer(i * 3, (i % 2) ? false : true);
      }
      fillResults();
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
      assert.equal(getState().result.total, 0 + 150 + 0 + 100 + 0 + 100 + 0 + (100 - 50) + 0 + (100 - 50));
    });

  });

});
