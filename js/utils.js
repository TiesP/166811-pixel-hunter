const main = document.querySelector(`main.central`);
let listModules = {};

export const initial = (list) => {
  listModules = list;
};

export const handlerChangePageTemplate = (templateName) => {
  return (ev) => {
    changePageTemplate(templateName);
  };
};

export const changePageTemplate = (templateName) => {
  main.innerHTML = ``;
  main.appendChild(listModules[templateName]);
};

export const getElementFromTemplate = (text) => {
  const node = document.createElement(`div`);
  node.innerHTML = text;
  return node;
};

export const addHandlerBackGreeting = (curModule) => {
  const itemBack = curModule.querySelector(`.back`);
  if (itemBack) {
    itemBack.addEventListener(`click`, handlerChangePageTemplate(`greeting`));
  }
  return curModule;
};
