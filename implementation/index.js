import { diffPoints, ENUM } from "./primitives.js";
import { waveConfig } from './GUI/index.js'

export {
    diffPoints
}

/**
 * @alias
 * 
 * @example
 * ENUMS.COLORS.red // 'red'
 * ENUMS.COLORS.green // 'green'
 * ENUMS.COLORS.blue // 'blue'
 */
export const
    ENUMS = {
        COLORS : ENUM
        ,
        SHAPE : ENUM
        ,
        UI_EVENTS : ENUM
        ,
        CASE : ENUM
    }
    ;

export 
    const
        userConfigs = {
            stage : {
                /* id: 'stage',  */// (default)
                container: document.body,
                scale: 20,
            }
            ,
            grid : {
                id: ENUMS.SHAPE.grid,
                hidden: !true,
                dotted: !true,
                lineWidth: 0.1, /* <=: for colours like 'magenta', use partial value to allow reader's eye to be easier to adapt... */
                strokeStyle: ENUMS.COLORS.magenta,
                opacity: 1 /* values := [0..1] */
            }
        }
        ;

export const initSVG = ({XMLSVG, HTMLCanvas}) => {

    const
        { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry;
        
    return (
        new XMLSVG.ViewGroup.Container({
            options: {
                id: ENUM.svg_container.replace("_", "-"),
                global: {
                    scalingFactor: 2
                }
            },
            childrenList: [
                new XMLSVG.Views.Circle({
                    options: {
                        id: ENUM.svg_circle.replace("_", "-"),
                        hidden: !true,
                        fill: ENUMS.COLORS.black,
                        radius: 150,
                        translateX: window.innerWidth / 2,
                        translateY: window.innerHeight / 2,
                    }
                }),
                new XMLSVG.Views.Path({
                    options: {
                        id: ENUM.svg_path.replace("_", "-"),
                        hidden: !true,
                        points: [
                            ...diffPoints({
                                Converters, 
                                setRangeFn: setRange,
                                resource: { 
                                    name: ENUMS.SHAPE.smooth_wave, 
                                    waveConfig 
                                }
                            })
                        ],
                        strokeWidth: 3,
                        fill: ENUMS.COLORS.none,
                        stroke: ENUMS.COLORS.green,
                    }
                })
            ]
        })
    );
}

export const transformSVG = ({HTMLCanvas, XMLSVG, parent}) =>{

    const svgElement = XMLSVG.Helpers.findBy(parent.firstElementChild.id);
        if ( svgElement ) {

            let 
                scalingFactor = parent.options.global.scalingFactor
                ;

            Array.from(svgElement.children).on((shape) => {

                switch (shape.tagName) {
                    case ENUMS.SHAPE.rect:
                        void function(){
                                
                                shape.setTranslate({x: Number(stage.grid.SVG.X_IN_MIDDLE), y: Number(stage.grid.SVG.Y_IN_MIDDLE)});
                                shape.setArea({width: stage.grid.GRIDCELL_DIM * scalingFactor, height: stage.grid.GRIDCELL_DIM * scalingFactor});
    
                                if ( shape.id === `rect-2` ) {
                                        
                                    shape.setTranslate({
                                        x: Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).getTranslate().x ) + Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).getArea().width ), 
                                        y: Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).getTranslate().y ) + Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).getArea().height )
                                    })
    
                                }
    
                        }();
                    break;
                    case ENUMS.SHAPE.circle:
                        void function(){
    
                            shape.setCircle({
                                cx: Number(stage.grid.SVG.X_IN_MIDDLE),
                                cy: Number(stage.grid.SVG.Y_IN_MIDDLE),
                                r: Number(stage.grid.GRIDCELL_DIM) * (scalingFactor / 8)
                            })
    
                        }();
                    break;
                    case ENUMS.SHAPE.path:
                        void function () {
    
                            shape.style.strokeWidth = 
                                ( Number( shape.attributes.getNamedItem('stroke-width').value ) * (  1 / stage.grid.GRIDCELL_DIM ) );
                            
                            const currentMatrix = (cursorFeedback) => {
    
                                const
                                    DEFAULT_ANGLE = 0
                                    ,
                                    matrix = new DOMMatrix(
                                        HTMLCanvas.Helpers.Trigonometry.setTransform( DEFAULT_ANGLE , (cursorFeedback?.x || Number(stage.grid.SVG.X_IN_MIDDLE)), (cursorFeedback?.y || Number(stage.grid.SVG.Y_IN_MIDDLE)))
                                    );
                                    
                                    // DEV_NOTE (!) # if you really want to see view (shape), make sure you have scaled it to some extent...
                                    matrix.scaleSelf(stage.grid.GRIDCELL_DIM *  ( 1 / Math.cos( Math.PI/4 ) ) , stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ));
                                
                                return matrix;
    
                            }
    
                            shape.setAttribute("transform", currentMatrix().toString());
    
                            shape.addEventListener(ENUMS.UI_EVENTS.click, (e) => {
                                XMLSVG.enableDraggingFor(e.currentTarget, currentMatrix.bind(null))
                            });
                            
                        }();
                    break;
                }

                shape.addEventListener(ENUMS.UI_EVENTS.click, (e)=>{
                    if ( shape.tagName !== ENUMS.SHAPE.path ) XMLSVG.enableDraggingFor(e.currentTarget) ;
                });

            });

        }

}