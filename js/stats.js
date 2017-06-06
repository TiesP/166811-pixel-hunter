import {getElementFromTemplate, addHandlerBackGreeting, getHeader, getResults} from './utils.js';
import footer from './footer';

const moduleStats = getElementFromTemplate(`
${getHeader()}
<div class="result">
  <h1>Победа!</h1>
  ${getResults()}
</div>
${footer}
`);

export default addHandlerBackGreeting(moduleStats);
