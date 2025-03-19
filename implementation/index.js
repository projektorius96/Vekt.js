export default (View) => {
    return (
        new View.Container({
            options: {
                id: 'svg-container',
            },
            childrenList: [
                new View.Circle({
                    options: {
                        id: 'svg-circle',
                        hidden: !true,
                        scalingFactor: 1,
                        fill: 'black',
                        radius: 150,
                        translateX: window.innerWidth / 2,
                        translateY: window.innerHeight / 2,
                    }
                }),
                new View.Path({
                    options: {
                        id: 'svg-path',
                        hidden: !true,
                        scalingFactor: 1,
                        points: [
                            /* DEVViewNOTE # Define shape in relative units, scale later:.. */
                            { x: 0, y: 0 },
                            { x: 2 * 1, y: 0 },
                            { x: 1 * 1, y: 1 * 1 },
                            { x: 0, y: 0 },
                        ],
                        fill: 'yellow',
                        stroke: 'blue',
                    }
                })
                ,
                new View.Rect({ options: { id: 'rect-1', hidden: !true, scalingFactor: 100, fill: "red" } })
                ,
                new View.Rect({ options: { id: 'rect-2', hidden: !true, scalingFactor: 100, fill: "blue" } })
            ].map((access)=> access = access.component)
        })
    );
}

export const transformSVG = ({HTMLCanvas, XMLSVG, parent}) =>{

    const svgElement = XMLSVG.Helpers.findBy(parent.element.id);
    if ( svgElement ) {

        let scalingFactor = 2;
        Array.from(svgElement.children).forEach((shape, i) => {

            switch (shape.tagName) {
                case 'rect':
                    void function(){

                        shape.attributes.x.value = Number(stage.grid.SVG.X_IN_MIDDLE)
                        shape.attributes.y.value = Number(stage.grid.SVG.Y_IN_MIDDLE);

                        shape.attributes.width.value = stage.grid.GRIDCELL_DIM * scalingFactor
                        shape.attributes.height.value = stage.grid.GRIDCELL_DIM * scalingFactor
                        shape.attributes.width.value = stage.grid.GRIDCELL_DIM * scalingFactor
                        shape.attributes.height.value = stage.grid.GRIDCELL_DIM * scalingFactor
                        
                        /**
                         * 
                         * > **NOTE**: In order to avoid string coercion whilst accessing values via `.attributes` property, make sure you're setting values on the right hand side of expression using explicit `Number()` contructor !
                         */
                        let NOTE;
                        XMLSVG.Helpers.findBy(`${shape.tagName}-2`).attributes.x.value 
                            = Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).attributes.x.value ) + Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).attributes.width.value );
                        XMLSVG.Helpers.findBy(`${shape.tagName}-2`).attributes.y.value 
                            = Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).attributes.y.value ) + Number( XMLSVG.Helpers.findBy(`${shape.tagName}-1`).attributes.height.value );

                    }();
                break;
                case 'circle':
                    void function(){

                        shape.attributes.cx.value = Number(stage.grid.SVG.X_IN_MIDDLE)
                        shape.attributes.cy.value = Number(stage.grid.SVG.Y_IN_MIDDLE);
                        shape.attributes.r.value = Number(stage.grid.GRIDCELL_DIM) * scalingFactor / 8

                    }();
                break;
                case 'path':
                    void function () {

                        shape.style.strokeWidth = 1 / stage.grid.GRIDCELL_DIM
                        
                        const currentMatrix = (cursorFeedback) => {

                            const matrix = new DOMMatrix(
                                HTMLCanvas.Helpers.Trigonometry.setTransform(-45, (cursorFeedback?.x || Number(stage.grid.SVG.X_IN_MIDDLE)), (cursorFeedback?.y || Number(stage.grid.SVG.Y_IN_MIDDLE)))
                            );
                            
                            if (matrix) matrix.scaleSelf(stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ), stage.grid.GRIDCELL_DIM * ( 1 / Math.cos( Math.PI/4 ) ));
                            
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