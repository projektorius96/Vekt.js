import setStyling from './index.css.js'
import { setCoords, getNamespace } from "../modules/index.js";

export const svg_container = getNamespace(import.meta.url);
customElements.define(svg_container, class extends HTMLElement {

    constructor({ options, childrenList }) {

        if ( setStyling.call( super() , options) ) {
            
            let interpolatedHTML = "";
                childrenList.forEach((svgElement)=>interpolatedHTML += svgElement?.getHTML());

            this.setHTMLUnsafe(/* html */`
                <svg id="${ options.id || svg_container }">
                    ${ interpolatedHTML }
                </svg>
            `);

            /**
             * @javascript
             * 
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed as `this.options`
             */
            let HOVER_ME;
            Object.assign(this, {options, childrenList});

        }

        return this;

    }
    

    /**
     * @implements
     */
    connectedCallback(){
            
            setCoords.call(this)
            window.addEventListener('resize', ()=> setCoords.call(this));

            setMixin({ref: this.firstElementChild.children})

        }
        
})

function setMixin({ref}){
    Array.from(ref).forEach((view)=>{
        switch (view.tagName.toLowerCase()) {
            case 'circle' :
                Object.assign(view, {
                    getCircle(){
                        return ({
                            cx: view.attributes.cx.value, 
                            cy: view.attributes.cy.value, 
                            r: view.attributes.r.value
                        })
                    }
                    ,
                    setCircle({cx=0, cy=0, r=1}){
                        view.attributes.cx.value = cx
                        view.attributes.cy.value = cy;
                        view.attributes.r.value = r;
                    }
                });
            break;
            case 'rect' :
                Object.assign(view, {
                    getTranslate(){
                        return ({
                            x: view.attributes.x.value,
                            y: view.attributes.y.value
                        })
                    }
                    ,
                    setTranslate({x=0, y=0}){
                        view.attributes.x.value = x;
                        view.attributes.y.value = y;
                    }
                    ,
                    getArea(){
                        return ({
                            width: view.attributes.width.value  ,
                            height: view.attributes.height.value,
                        })
                    }
                    ,
                    setArea({width=1, height=1}){
                        view.attributes.width.value = width;
                        view.attributes.height.value = height;
                    }
                })
            break;
        }
    })
}