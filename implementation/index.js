import { diffShape } from "./primitives.js";

export const initSVG = ({Views, HTMLCanvas, COLORS}) => {

    /**
     * @alias
     */
    const 
        SHAPES = COLORS
        ,
        [
            circle, 
            square, 
            iso_sceles, 
            right_triangle, 
            smooth_wave, 
            tooth_wave
        ] = [
            SHAPES.circle.value, 
            SHAPES.square.value, 
            SHAPES.isosceles.value, 
            SHAPES.right_triangle.value, 
            SHAPES.smooth_wave.value,
            SHAPES.tooth_wave.value
        ]
    ;
    
    
    const
        [red, green, blue] = [COLORS.red.value, COLORS.green.value, COLORS.blue.value]
        ,
        { Converters, setRange } = HTMLCanvas.Helpers.Trigonometry
        ;
        
    return (
        new Views.Container({
            options: {
                id: 'svg-container',
            },
            childrenList: [
                new Views.Circle({
                    options: {
                        id: 'svg-circle',
                        hidden: !true,
                        fill: COLORS.black.value,
                        radius: 150,
                        translateX: window.innerWidth / 2,
                        translateY: window.innerHeight / 2,
                    }
                }),
                new Views.Path({
                    options: {
                        id: 'svg-path',
                        hidden: !true,
                        points: [
                            ...diffShape({resource: smooth_wave, Converters, setRangeFn: setRange})
                        ],
                        strokeWidth: 3,
                        fill: blue,
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
                scalingFactor = 2
                ;

            Array.from(svgElement.children).on((shape) => {

                switch (shape.tagName) {
                    case 'rect':
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
                    case 'circle':
                        void function(){
    
                            shape.setCircle({
                                cx: Number(stage.grid.SVG.X_IN_MIDDLE),
                                cy: Number(stage.grid.SVG.Y_IN_MIDDLE),
                                r: Number(stage.grid.GRIDCELL_DIM) * (scalingFactor / 8)
                            })
    
                        }();
                    break;
                    case 'path':
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
                                    matrix.scaleSelf(stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ) , stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ));
                                
                                return matrix;
    
                            }
    
                            shape.setAttribute("transform", currentMatrix().toString());
    
                            shape.addEventListener('click', (e) => {
                                XMLSVG.enableDraggingFor(e.currentTarget, currentMatrix.bind(null))
                            });
                            
                        }();
                    break;
                }

                shape.addEventListener('click', (e)=>{
                    if (shape.tagName !== 'path') XMLSVG.enableDraggingFor(e.currentTarget) ;
                });

            });

        }

}