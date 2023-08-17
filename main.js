import { render } from 'lit';
import { X_COUNTER } from './src/WebComponents';

// DEV_NOTE # use render for any exported WebComponent[s] to render it dynamically !
globalThis.count = new X_COUNTER(); // DEV_NOTE # open console, increment a value few times, than change it e.g. count.counter = 7, observe reactive change
render(globalThis.count, document.getElementById('app'));

