import { getNamespace, setPoints } from "../modules/index.js";

export const svg_path = getNamespace(import.meta.url);
customElements.define(svg_path, class extends HTMLElement {
    
    constructor({options}) {

        if ( super() ) {

            if (!options.hidden) {

                this.setHTMLUnsafe(/* html */`
                    <path
                        id="${ options.id }" 
                        d="${ setPoints.call(this, options.points) }"
                        stroke-dasharray="${ options.dashed ||  0 }"
                        stroke-Width="${ options.strokeWidth || 0 }"
                        style="stroke:${ options.stroke || 'black'}; fill:${ options.fill || 'none' };"
                    />
                `);

            }

        }

    }

});