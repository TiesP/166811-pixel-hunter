import greeting from './greeting';

const main = document.querySelector(`main.central`);

export function changePageTemplate(template, which) {
  if (which && which !== 1) {
    return;
  }
  main.innerHTML = ``;
  main.appendChild(template);
}

export function getElementFromTemplate(text) {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
}

export function addHandlerBackGreeting(curModule) {
  const itemBack = curModule.querySelector(`.back`);
  if (itemBack) {
    itemBack.addEventListener(`click`, () => {
      changePageTemplate(greeting);
    });
  }
  return curModule;
}
