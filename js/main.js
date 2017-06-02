import {handlerChangePageTemplate, initial} from './utils.js';
import greeting from './greeting';
import rules from './rules';
import gameOne from './game-1';
import gameTwo from './game-2';
import gameThree from './game-3';
import stats from './stats';

const intro = document.querySelector(`.intro__asterisk`);
intro.addEventListener(`click`, handlerChangePageTemplate(`greeting`));

initial({'greeting': greeting, 'rules': rules, 'game-1': gameOne, 'game-2': gameTwo, 'game-3': gameThree, 'stats': stats});
