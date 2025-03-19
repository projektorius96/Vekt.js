import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import init, { transformSVG } from './implementation/index.js';

document.addEventListener('DOMContentLoaded', ()=>{

    document.body.appendChild(
        new HTMLCanvas.ViewGroup.Stage({
            container: document.body,
            id: 'stage', 
            scale: 20
        })
    );

    const svgContainer = init(XMLSVG.Views);
        document.body.children.stage?.add([
            new HTMLCanvas.ViewGroup.Layer({
                name: 'grid'
            }),
            svgContainer.component
        ])

    if ( HTMLCanvas.init({stage}) ) {

        window.on('resize', ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        if ( context instanceof CanvasRenderingContext2D ) {
                
                                const canvas = context.canvas;
                                                
                                switch (canvas.name) {
                
                                    case stage.layers.grid.name :
                                        HTMLCanvas.Views.Grid.draw({
                                            canvas,
                                            options: {
                                                hidden: !true,
                                                lineWidth: 1,
                                                strokeStyle: 'grey',
                                                opacity: 0.25
                                            }
                                        });
                                    break;

                                }
                        }

                    /* === SVGraphics === */

                        if ( stage.grid ) transformSVG({XMLSVG, parent: svgContainer}) ;
    
                    /* === SVGraphics === */
                    
                    })
            
        })

        // # This allows to init bitmap with internal context without waiting `window.onresize` to be triggered by end-user (or developer)
        window.dispatchEvent(new Event('resize'));

    }

});