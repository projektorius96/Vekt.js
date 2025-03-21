export default ({Views, COLORS}) => {

    const 
        [black, yellow, red, green, blue] = [COLORS.black, COLORS.yellow, COLORS.red, COLORS.green, COLORS.blue];

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
                            /* DEV_NOTE # Define shape in relative units, scale later:.. */
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
            ].map((access)=> access = access.component)
        })
    );
}

export const transformSVG = ({HTMLCanvas, XMLSVG, parent}) =>{

    const svgElement = XMLSVG.Helpers.findBy(parent.element.id);
    if ( svgElement ) {

        let 
            scalingFactor = 2
            ;

        Array.from(svgElement.children).on((shape) => {

            if ( registerSettersFor( shape ) ) {

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
            
            }

            shape.addEventListener('click', (e)=>{
                if (shape.tagName !== 'path') XMLSVG.enableDraggingFor(e.currentTarget) ;
            });

        });

    }

}

function registerSettersFor(svgShape){
    
    switch (svgShape.tagName) {
        case 'rect':
            Object.assign(svgShape, {
                getTranslate(){
                    return ({
                        x: svgShape.attributes.x.value,
                        y: svgShape.attributes.y.value
                    })
                }
                ,
                setTranslate({x=0, y=0}){
                    svgShape.attributes.x.value = x;
                    svgShape.attributes.y.value = y;
                }
                ,
                getArea(){
                    return ({
                        width: svgShape.attributes.width.value  ,
                        height: svgShape.attributes.height.value,
                    })
                }
                ,
                setArea({width=1, height=1}){
                    svgShape.attributes.width.value = width;
                    svgShape.attributes.height.value = height;
                }
            })
        break;
        case 'circle':
            Object.assign(svgShape, {
                getCircle(){
                    return ({
                        cx: svgShape.attributes.cx.value, 
                        cy: svgShape.attributes.cy.value, 
                        r: svgShape.attributes.r.value
                    })
                }
                ,
                setCircle({cx=0, cy=0, r=1}){
                    svgShape.attributes.cx.value = cx
                    svgShape.attributes.cy.value = cy;
                    svgShape.attributes.r.value = r;
                }
            })
        break;
    }

    return true;

}