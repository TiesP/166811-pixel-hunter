import AbstractView from '../view';
import footer from '../components/footer';
import header from '../components/header';
import getListStats from '../components/lineStats';
import {getStats} from '../stats/stats';

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
      return r + this._getTableBonuses(item, i);
    }, ``);
  }

  _getTableBonuses(item, i) {
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
        ${this._getBonuses(item.bonuses)}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${item.total + this._getSumBonuses(item.bonuses)}</td>
        </tr>
      </table>
    `;
    }
    return tableText;
  }

  _getSumBonuses(bonuses) {
    return Object.keys(bonuses).reduce((r, key) => {
      let item = bonuses[key];
      return r + (item.points * item.count);
    }, 0);
  }

  _getBonuses(bonuses) {
    return Object.keys(bonuses).reduce((r, key) => {
      return r + this._getRowBonus(key, bonuses[key]);
    }, ``);
  }

  _getRowBonus(type, item) {
    return `
    <tr>
    <td></td>
    <td class="result__extra">${this._getBonusName(type)}:</td>
    <td class="result__extra">${item.count}&nbsp;<span class="stats__result stats__result--${type}"></span></td>
    <td class="result__points">×&nbsp;${(type === `slow`) ? -item.points : item.points}</td>
    <td class="result__total">${item.points * item.count}</td>
    </tr>
    `;
  }

  _getBonusName(type) {
    if (type === `fast`) {
      return `Бонус за скорость`;
    } else if (type === `heart`) {
      return `Бонус за жизни`;
    } else if (type === `slow`) {
      return `Штраф за медлительность`;
    }
    return ``;
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
