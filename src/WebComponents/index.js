import { LitElement, html } from 'lit';
import { UNDERSCORE, HYPHENMINUS } from '../unicode_constants';

/* DEV_ NOTE # Many thanks ChatGPTv3.5 for help demystifying Lit docs ♥ !

GOAL # declare a reactive property change changing LitElement's static properties accessor via Lit Events

*/
// export class X_COUNTER extends LitElement {
//     static properties = {
//         counter: { type: Number },
//     };

//     constructor(arbitraryInitValue) {
//         super();
//         this.counter = arbitraryInitValue || 0;
//     }

//     render() {
//         return html`
//             <div>
//                 <p>Counter: ${this.counter}</p>
//                 <button @click=${this.increment}>Increment</button>
//             </div>
//         `;
//     }

//     increment() {
//         this.counter++;
//     }
// }

/* DEV_ NOTE # Many thanks ChatGPTv3.5 for help demystifying Lit docs ♥ !

GOAL # declare a reactive property change via instance property change in a way that it would avoid LitElement prototype reactive property accessor "shadowing", see for [link]
[cont'd]@link{https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields} 

*/
export class X_COUNTER extends LitElement {
    static properties = {
        _counter : {
            attribute: 'counter'
        }
    }

    constructor() {
        super();
        this._counter = 0; // Use a private instance property
    }

    get counter() {
        return this._counter;
    }

    set counter(value) {
        if (this._counter !== value) {
            this._counter = value;
            this.requestUpdate(X_COUNTER.properties._counter.attribute, null); // Manually trigger update
        }
    }

    render() {
        return html`
        <div>
            <p>Counter: ${this.counter}</p>
            <button @click=${this.increment}>Increment</button>
        </div>
        `;
    }

    increment() {
        this.counter++;
    }
}
customElements.define(X_COUNTER.name.toLowerCase().replace(UNDERSCORE, HYPHENMINUS), X_COUNTER)


