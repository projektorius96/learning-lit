import { render } from 'lit';
import { X_COUNTER } from './src/WebComponents';

// DEV_NOTE # use render for any exported WebComponent[s] to render it dynamically !
globalThis.lit = new X_COUNTER(); // DEV_NOTE # open console, increment a value few times, than change it e.g. lit.counter = 7, observe reactive change
render(globalThis.lit, document.getElementById('app'));

