export default function getLineStats(stats) {
  return `
  <div class="stats">
    <ul class="stats">
      ${getListStats(stats)}
    </ul>
  </div>
  `;
}

function getListStats(arr) {
  return arr.reduce((r, res) => {
    return r + `<li class="stats__result stats__result--${res}"</li>
    `;
  }, ``);
}
