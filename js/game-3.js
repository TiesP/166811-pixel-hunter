import {getElementFromTemplate, changePageTemplate, addHandlerBackGreeting, getLevel, getHeader} from './utils.js';
import stats from './stats';
import footer from './footer';

const moduleGameTree = getElementFromTemplate(`
${getHeader(`game-3`)}
${getLevel(`game-3`)}
${footer}
`);

const itemsOption = Array.from(moduleGameTree.querySelectorAll(`.game__option`));
itemsOption.forEach((item) => {
  item.addEventListener(`mousedown`, (e) => {
    changePageTemplate(stats, e.which);
  });
});

export default addHandlerBackGreeting(moduleGameTree);
