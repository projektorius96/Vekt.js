import { getNamespace } from "../modules/index.js";

export const svg_rect = getNamespace(import.meta.url);
customElements.define(svg_rect, class extends HTMLElement {

    constructor({ options }) {

        if ( super() ) {

            !options.hidden
            ?
            this.#initRect.call( this , options )
            :
            false;

        }

    }

    /* void */ #initRect(options) {

        this.setHTMLUnsafe(/* html */`
            <rect 
                id="${ options.id }" 
                x="${ options.x || 0 }" 
                y="${ options.y || 0 }" 
                width="${   (options.width || 1) }" 
                height="${ (options.height || 1) }" 
                stroke="${ (options.stroke || 'none') }" 
                fill="${      options.fill || 'none' }"
                stroke-width="${ options.strokeWidth || 0 }" 
            />
        `);

        return;

    }

});