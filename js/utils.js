const main = document.querySelector(`main.central`);

export function changeView(view) {
  main.innerHTML = ``;
  main.appendChild(view.element);
}
