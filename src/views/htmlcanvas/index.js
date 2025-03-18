import "./utils";
import { stage_view } from './stage-view/index.js';
import { layer_view } from './layer-view/index.js';
import { grid_view } from './grid-view/index.js'
import { degToRad, setAngle } from "./trigonometry";

export default class {

    /**
     * @typedef {Array} Iterable
     * 
     * @param {HTMLDivElement} `stage` - the reference to the current instance of `stage`
     * @returns {Iterable} `Iterable` : if such iterable is iterated, each value of such `Iterable`'s is a "`view-group`"; top-level `view-group` conventionally is called **"`stage`"**, otherwise it's a **"`layer`"**
     */
        static init({ stage }) {

            if ( this.#responsify({ stage }) ) {
                return (
                    this.#getIterable(stage.layers)
                        .map(canvas => {
                            if (canvas instanceof HTMLCanvasElement) {
                                return (
                                    canvas = canvas.getContext('2d')
                                );
                            }
                        })
                );
            }
    
        }

        /** 
         * > This function expresson is a guard against end-user or developer, who know very little about canonical `Canvas API`
         * @param {Number} num - odd number that is made even, or even number that is left out as is, i.e. even
         * @returns makes sure the `GRIDCELL_DIM_RATIO` is always even, this makes sure shapes (views) are well centred in grid-first coordinate system
        */
        static #evenNumber = (num = 0) => {
            const rounded = Math.ceil(num);
            return (
                ( (rounded % 2) === 1 ) ? (rounded + 1) : (rounded)
            );
        }

        /**
         * @param {HTMLDivElement} stage - canvas wrapping element (**"view-group"**), if such "`view-group`" is a top-level `view-group`, by convention we will call it the **"`stage`"**
         * @returns {Boolean} `true`
         */
        static #responsify(){

            const
                GRIDCELL_DIM = ( stage.clientWidth / this.#evenNumber( stage.scale ) )
                ,
                divisorX = Math.ceil( stage?.clientWidth / GRIDCELL_DIM )
                ,
                divisorY = Math.ceil( stage?.clientHeight / GRIDCELL_DIM )
                ,
                X_IN_MIDDLE = ( ( divisorX * GRIDCELL_DIM ) / 2 )
                ,  
                Y_IN_MIDDLE = ( ( divisorY * GRIDCELL_DIM  ) / 2 )
            ;

            stage.grid = {
                GRIDCELL_DIM,
                X_IN_MIDDLE: X_IN_MIDDLE * window.devicePixelRatio, 
                Y_IN_MIDDLE: Y_IN_MIDDLE * window.devicePixelRatio,
            }

            Object.assign( stage.grid, {
                SVG: {
                    X_IN_MIDDLE: stage.grid.X_IN_MIDDLE / window.devicePixelRatio, 
                    Y_IN_MIDDLE: stage.grid.Y_IN_MIDDLE / window.devicePixelRatio,
                }
            });

            if (stage.children.length > 0){

                Array.from( stage.children ).forEach((layer)=>{
                    
                    if (layer instanceof HTMLCanvasElement) {
                        layer.width = stage?.clientWidth * window.devicePixelRatio;
                        layer.height = stage?.clientHeight * window.devicePixelRatio;
                    }

                });
            
            }

        return true;

    }

    static #getIterable(nonIterable){
        if (!Array.isArray(nonIterable)){
            return Array.from(nonIterable)
        }
    }

    static ViewGroup = {
        Stage : customElements.get(stage_view),
        Layer : customElements.get(layer_view)
    }
    
    static Views = {
        Grid: grid_view
    }

    static Helpers = {
        Trigonometry: {
            setAngle
            ,
            Converters: {
                degToRad
            }
        }
    }

    static {

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Helpers);

    }

}