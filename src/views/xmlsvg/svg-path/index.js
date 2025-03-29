import { getNamespace } from "../modules/index.js";

export const svg_path = getNamespace(import.meta.url);
customElements.define(svg_path, class extends HTMLElement {

    #generateSVGPath(points) {
    
        if (points.length === 0) return "";
            let path = `M 0 0`;
                points.forEach((point, i) => {
                    if (i > 0){
                        path += ` L ${point.x} ${point.y}`;
                    }
                });
        
        return path;

    }
    
    constructor({options}) {

        if ( super() ) {

            if (!options.hidden) {

                this.setHTMLUnsafe(/* html */`
                    <path
                        id="${ options.id }" 
                        d="${ this.#generateSVGPath(options.points) }"
                        stroke-Width="${ options.strokeWidth || 0 }"
                        style="stroke:${ options.stroke || 'black'}; fill:${ options.fill || 'none' };"
                    />
                `);

            }

        }

    }

});