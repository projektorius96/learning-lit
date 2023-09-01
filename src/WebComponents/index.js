import { LitElement, html } from 'lit';
import { UNDERSCORE, HYPHENMINUS } from '../unicode_constants';

const GlobalStaticPropsConfig = {
    attribute: false, /* DEV_NOTE # ignores {converter, reflect, type}, hence no attributes mapping exposed to custom element markup */
    state: true, /* DEV_NOTE # enforces Lit's internal reactive state && [optionally] declare hasChange as follows: */
    hasChanged(newValue, oldValue){
        return newValue !== oldValue;
    }
}

/* DEV_ NOTE # Many thanks ChatGPTv3.5 for help demystifying Lit docs ♥ !

    GOAL # declare a reactive property change changing LitElement's static properties accessor via Lit Events

*/
// export class X_COUNTER extends LitElement {
//     static properties = {
//         counter: { type: Number },
//     };

//     constructor() {
//         super();
//         this.counter = 0
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
        // id is public field
        id : {
            ...GlobalStaticPropsConfig,
        }
    }

    constructor() {
        super();
        this.id = 1;
    }

    get counter() {
        return this.id;
    }

    set counter(new_value) {
        const { hasChanged : diff } = this.constructor.properties.id;
        if ( diff(new_value, this.id) && /* === */ ( this.id = new_value ) /* === */ ) {

            /* DEV_NOTE # this.requestUpdate should be called when an element should update based on some state not triggered by setting a reactive property, also implementing arbitrary setter is what we doing right now ! */
            this.requestUpdate('counter' /* + currentIndex@int incoming from matrix iterator */, this.id); // Manually trigger update [recommended, but not mandatory to be called]
        
        }
    }

    render() {
        return html`
        <div>
            <p>Counter: ${this.id}</p>
            <button @click=${this.increment}>Increment</button>
        </div>
        `;
    }

    increment() {
        this.id++;
    }
}

customElements.define(X_COUNTER.name.toLowerCase().replace(UNDERSCORE, HYPHENMINUS), X_COUNTER)


