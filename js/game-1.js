import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting, getLevel, getHeader} from './utils.js';
import gameTwo from './game-2';
import footer from './footer';

const moduleGameOne = getElementFromTemplate(`
${getHeader(`game-1`)}
${getLevel(`game-1`)}
${footer}
`);

const state = {question1: ``, question2: ``};
const itemsInput = Array.from(moduleGameOne.querySelectorAll(`.game__option input`));
itemsInput.forEach((item) => {
  item.addEventListener(`change`, (event) => {
    checkComplete(event);
  });
});

function checkComplete(e) {
  setState(e.currentTarget);
  let complete = true;
  let key;
  for (key in state) {
    if (!state[key]) {
      complete = false;
    }
  }
  if (complete) {
    changePageTemplate(gameTwo);
  }
}

function setState(el) {
  state[el.name] = el.value;
}

export default addHandlerBackGreeting(moduleGameOne);
