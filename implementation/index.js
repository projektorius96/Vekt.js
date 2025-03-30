import { diffShape, ENUM } from "./primitives.js";

/**
 * @alias
 * 
 * @example
 * COLORS.red // 'red'
 * COLORS.green // 'green'
 * COLORS.blue // 'blue'
 */
export const
    COLORS = ENUM
    ,
    SHAPE_TYPE = ENUM
    ,
    UI_EVENTS = ENUM
    ;

export 
    const
        userConfigs = {
            stage : {
                /* id: 'stage',  */// (default)
                container: document.body,
                scale: 30,
            }
            ,
            grid : {
                id: ENUM.grid,
                hidden: !true,
                dotted: !true,
                lineWidth: 0.1, /* <=: for colours like 'magenta', use partial value to allow reader's eye to be easier to adapt... */
                strokeStyle: COLORS.magenta,
                opacity: 1 /* values := [0..1] */
            }
        }
        ;

export const initSVG = ({XMLSVG, HTMLCanvas}) => {

    let 
        COLORS = ENUM
        ,
        SHAPES = ENUM
        ;

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
                        fill: COLORS.black,
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
                            ...diffShape({resource: { name: SHAPES.smooth_wave }, Converters, setRangeFn: setRange})
                        ],
                        strokeWidth: 3,
                        fill: COLORS.green,
                        stroke: 'none',
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
                    case SHAPE_TYPE.rect:
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
                    case SHAPE_TYPE.circle:
                        void function(){
    
                            shape.setCircle({
                                cx: Number(stage.grid.SVG.X_IN_MIDDLE),
                                cy: Number(stage.grid.SVG.Y_IN_MIDDLE),
                                r: Number(stage.grid.GRIDCELL_DIM) * (scalingFactor / 8)
                            })
    
                        }();
                    break;
                    case SHAPE_TYPE.path:
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
    
                            shape.addEventListener(UI_EVENTS.click, (e) => {
                                XMLSVG.enableDraggingFor(e.currentTarget, currentMatrix.bind(null))
                            });
                            
                        }();
                    break;
                }

                shape.addEventListener(UI_EVENTS.click, (e)=>{
                    if ( shape.tagName !== SHAPE_TYPE.path ) XMLSVG.enableDraggingFor(e.currentTarget) ;
                });

            });

        }

}