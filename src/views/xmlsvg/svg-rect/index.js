import { getNamespace } from "../modules/index.js";

export const svg_rect = getNamespace(import.meta.url);
customElements.define(svg_rect, class extends HTMLElement {

    constructor({options}) {

        if ( super() ) {

            if (!options.hidden){

                /**
                 * @html
                 */
                let html;
                this.setHTMLUnsafe(/* html */`
                    <rect 
                        id="${ options.id }" 
                        x="${ options.x || 0 }" 
                        y="${ options.y || 0 }" 
                        width="${ options.scalingFactor * (options.width || 1) }" 
                        height="${ options.scalingFactor * (options.height || 1) }" 
                        stroke="${ options.stroke || 'none' }" 
                        stroke-width="${ options.strokeWidth || 1 }" 
                        fill="${ options.fill || 'none' }"
                    />
                `);

            }

            /**
             * @javascript
             * 
             * > The following line makes `options` available within e.g. `connectedCallback` accessed as `this.options`
             */
            let javascript;

            Object.assign(this, {options});

        }

        return ({
            component: this,
            element: this.firstElementChild
        });

    }

    /**
     * @implements
     */
    connectedCallback(){
        /* ... */
    }

});