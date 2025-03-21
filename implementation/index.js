export default ({Views, COLORS}) => {

    const 
        [red, green, blue] = [COLORS.red, COLORS.green, COLORS.blue]
        ,
        [black, yellow] = [COLORS.black, COLORS.yellow]
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
                        scalingFactor: 1,
                        fill: black.value,
                        radius: 150,
                        translateX: window.innerWidth / 2,
                        translateY: window.innerHeight / 2,
                    }
                }),
                new Views.Path({
                    options: {
                        id: 'svg-path',
                        hidden: !true,
                        scalingFactor: 1,
                        points: [
                            /* EXAMPLE # Define now (in relative units), scale later:.. */
                            { x: 0, y: 0 },
                            { x: 2 * 1, y: 0 },
                            { x: 1 * 1, y: 1 * 1 },
                            { x: 0, y: 0 },
                        ],
                        fill: yellow.value,
                        stroke: blue.value,
                    }
                })
                ,
                new Views.Rect({ options: { id: 'rect-1', hidden: !true, scalingFactor: 100, fill: red.value } })
                ,
                new Views.Rect({ options: { id: 'rect-2', hidden: !true, scalingFactor: 100, fill: blue.value } })
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
    
                            shape.style.strokeWidth = 1 / stage.grid.GRIDCELL_DIM;
                            
                            const currentMatrix = (cursorFeedback) => {
    
                                const matrix = new DOMMatrix(
                                    HTMLCanvas.Helpers.Trigonometry.setTransform(-45, (cursorFeedback?.x || Number(stage.grid.SVG.X_IN_MIDDLE)), (cursorFeedback?.y || Number(stage.grid.SVG.Y_IN_MIDDLE)))
                                ); matrix.scaleSelf(stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ) , stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ));
                                
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