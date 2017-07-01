const main = document.querySelector(`main.central`);

export function changePageTemplate(template) {
  main.innerHTML = ``;
  main.appendChild(template);
}

export function changeView(view) {
  main.innerHTML = ``;
  main.appendChild(view.element);
}

export function getElementFromTemplate(text) {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
}
