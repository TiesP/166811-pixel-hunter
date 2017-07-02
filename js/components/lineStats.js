export default function getLineStats(stats) {
  return `
    <ul class="stats">
      ${getListStats(stats)}
    </ul>
  `;
}

function getListStats(arr) {
  return arr.reduce((r, res) => {
    return r + `<li class="stats__result stats__result--${res}"></li>
    `;
  }, ``);
}
