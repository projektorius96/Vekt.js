import setStyling from './index.css.js'

import { setCoords, getNamespace } from "../utils";

export const svg_container = getNamespace(import.meta.url);
customElements.define(svg_container, class extends HTMLElement {

    constructor({options, childrenList}) {

        if ( super() ) {

            /**
             * @css
             */
            let css;
            setStyling.call(this, options)
            
            let interpolatedHTML = '';
                childrenList.forEach((svgElement)=>interpolatedHTML += svgElement?.getHTML());         

            /**
             * @html
             */
            /* let html; */
            this.setHTMLUnsafe(/* html */`
                <svg id="${ options.id || svg_container }">
                    ${ interpolatedHTML }
                </svg>
            `);

            /**
             * @javascript
             * 
             * > The following line makes `options` available within e.g. `connectedCallback` accessed as `this.options`
             */
            let javascript;
            Object.assign(this, {options, childrenList});

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
            
            setCoords.call(this)
            window.addEventListener('resize', ()=>{
                
                setCoords.call(this)
                
            });

        }
        
})