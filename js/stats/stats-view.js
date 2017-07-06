import AbstractView from '../view';
import footer from '../components/footer';
import header from '../components/header';
import getListStats from '../components/lineStats';
import {getStats} from '../stats/stats';
import {StatsType} from '../data';

export default class StatsView extends AbstractView {
  constructor(result, results) {
    super();
    this.result = result;
    this.results = results;
  }

  get template() {
    return `
    ${header()}
    <div class="result">
      <h1>${(this.result.total === 0) ? `Поражение` : `Победа`}!</h1>
      ${this._getResults()}
    </div>
    ${footer}
    `;
  }

  _getResults() {
    const results = [].concat(this.result, this.results);
    return results.reduce((r, item, i) => {
      return r + getTableBonuses(item, i);
    }, ``);
  }

  bind() {
    this.element.querySelector(`.back`)
      .addEventListener(`click`, () => {
        this.onPrevScreen();
      });
  }

  onPrevScreen() {

  }

}

function getTableBonuses(item, i) {
  let tableText;
  if (item.total === 0) {
    tableText = `
    <table class="result__table">
      <tr>
        <td class="result__number">${i + 1}.</td>
        <td>
        <div class="stats">
          ${getListStats(getStats(item.answers))}
        </div>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
  `;
  } else {
    tableText = `
    <table class="result__table">
      <tr>
        <td class="result__number">${i + 1}.</td>
        <td colspan="2">
          ${getListStats(getStats(item.answers))}
        </td>
        <td class="result__points">×&nbsp;${item.points}</td>
        <td class="result__total">${item.total}</td>
      </tr>
      ${getBonuses(item.bonuses)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${item.total + getSumBonuses(item.bonuses)}</td>
      </tr>
    </table>
  `;
  }
  return tableText;
}

function getSumBonuses(bonuses) {
  return Object.keys(bonuses).reduce((r, key) => {
    let item = bonuses[key];
    return r + (item.points * item.count);
  }, 0);
}

function getBonuses(bonuses) {
  return Object.keys(bonuses).reduce((r, key) => {
    return r + getRowBonus(key, bonuses[key]);
  }, ``);
}

function getRowBonus(type, item) {
  return `
  <tr>
  <td></td>
  <td class="result__extra">${getBonusName(type)}:</td>
  <td class="result__extra">${item.count}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
  <td class="result__points">×&nbsp;${(type === StatsType.SLOW) ? -item.points : item.points}</td>
  <td class="result__total">${item.points * item.count}</td>
  </tr>
  `;
}

function getBonusName(type) {
  if (type === StatsType.FAST) {
    return `Бонус за скорость`;
  } else if (type === StatsType.HEART) {
    return `Бонус за жизни`;
  } else if (type === StatsType.SLOW) {
    return `Штраф за медлительность`;
  }
  return ``;
}
