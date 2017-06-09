import {getElementFromTemplate, addHandlerBackGreeting} from './utils.js';
import {getData} from './data';
import footer from './components/footer';
import header from './components/header';
import getLineStats from './components/lineStats';

const moduleStats = getElementFromTemplate(`
${header()}
<div class="result">
  <h1>Победа!</h1>
  ${getResults()}
</div>
${footer}
`);

function getResults() {
  const results = getData(`results`);
  return results.reduce((r, item, i) => {
    return r + getTableBonuses(item, i);
  }, ``);
}

function getTableBonuses(item, i) {
  let tableText;
  if (item.total === 0) {
    tableText = `
      <table class="result__table">
        <tr>
          <td class="result__number">${i + 1}.</td>
          <td>
            ${getLineStats(item.stats)}
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
            ${getLineStats(item.stats)}
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
  return bonuses.reduce((r, item) => {
    return r + (item.points * item.count);
  }, 0);
}

function getBonuses(bonuses) {
  return bonuses.reduce((r, item) => {
    return r + getRowBonus(item);
  }, ``);
}

function getRowBonus(item) {
  return `
    <tr>
    <td></td>
    <td class="result__extra">${getBonusName(item.type)}:</td>
    <td class="result__extra">${item.count}&nbsp;<span class="stats__result stats__result--${item.type}"></span></td>
    <td class="result__points">×&nbsp;${(item.type === `slow`) ? -item.points : item.points}</td>
    <td class="result__total">${item.points * item.count}</td>
    </tr>
  `;
}

function getBonusName(type) {
  if (type === `fast`) {
    return `Бонус за скорость`;
  } else if (type === `heart`) {
    return `Бонус за жизни`;
  } else if (type === `slow`) {
    return `Штраф за медлительность`;
  }
  return ``;
}

export default addHandlerBackGreeting(moduleStats);
