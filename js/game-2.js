import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting, getLevel, getHeader} from './utils.js';
import gameThree from './game-3';
import footer from './footer';

const moduleGameTwo = getElementFromTemplate(`
${getHeader(`game-2`)}
${getLevel(`game-2`)}
${footer}
`);

const itemsInput = Array.from(moduleGameTwo.querySelectorAll(`.game__option input`));
itemsInput.forEach((item) => {
  item.addEventListener(`click`, () => {
    changePageTemplate(gameThree);
  });
});

export default addHandlerBackGreeting(moduleGameTwo);
