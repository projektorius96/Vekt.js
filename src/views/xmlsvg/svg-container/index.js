import setStyling from './index.css.js'
import { ENUM, getNamespace, setCoords, setPoints } from "../modules/index.js";

/**
 * @alias
 */
const [
    UI_EVENT
    , 
    SHAPE
    ,
    METHOD
] = Array(3).fill(ENUM);

export const svg_container = getNamespace(import.meta.url);
customElements.define(svg_container, class extends HTMLElement {

    constructor({ options, childrenList }) {

        if ( setStyling.call( super() , options) ) {
            
            let interpolatedHTML = "";
                childrenList.forEach( (svgElement)=>interpolatedHTML += svgElement?.getHTML() );

            this.setHTMLUnsafe(/* html */`
                <svg id="${ options.id || svg_container }">
                    ${ interpolatedHTML }
                </svg>
            `);

            /**
             * > The following line makes `options` available within life cycle methods, e.g. `connectedCallback` accessed via `this.options`
             */
            Object.assign(this, {options, childrenList});

        }

        Object.assign(this, {options})
        return this;

    }
    

    /**
     * @implements
     */
    connectedCallback(){
            
            setCoords.call(this);
            window.addEventListener( UI_EVENT.resize , ()=> setCoords.call(this) );

            setMixin({ref: this.firstElementChild.children});

    }
        
})

function setMixin({ref}){
    Array
    .from(ref)
        .forEach((view)=>{
            switch ( view.tagName.toLowerCase() ) {
                case SHAPE.path :
                    Object.assign(
                        view
                        , 
                        {
                            [METHOD.getPoints](){
                                return(
                                    this.attributes.d.value
                                );
                            }
                            ,
                            [METHOD.setPoints](points){                      
                                this.attributes.d.value = setPoints.call(view, points)
                            }
                        }
                    ) ;
                break ;
                case SHAPE.circle :
                Object.assign(view, {
                    [METHOD.getCircle](){
                        return ({
                            cx: view.attributes.cx.value, 
                            cy: view.attributes.cy.value, 
                            r: view.attributes.r.value
                        })
                    }
                    ,
                    [METHOD.setCircle]({cx=0, cy=0, r=1}){
                        view.attributes.cx.value = cx
                        view.attributes.cy.value = cy;
                        view.attributes.r.value = r;
                    }
                });
                break;
                case SHAPE.rect :
                    Object.assign(view, {
                        [METHOD.getTranslate](){
                            return ({
                                x: view.attributes.x.value,
                                y: view.attributes.y.value
                            })
                        }
                        ,
                        [METHOD.setTranslate]({x=0, y=0}){
                            view.attributes.x.value = x;
                            view.attributes.y.value = y;
                        }
                        ,
                        [METHOD.getArea](){
                            return ({
                                width: view.attributes.width.value  ,
                                height: view.attributes.height.value,
                            })
                        }
                        ,
                        [METHOD.setArea]({width=1, height=1}){
                            view.attributes.width.value = width;
                            view.attributes.height.value = height;
                        }
                    })
                break;
            }
        })
}