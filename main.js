import { HTMLCanvas, XMLSVG, ENUMS as COLORS } from './src/views/index.js';
import initSVG, { transformSVG } from './implementation/index.js';

document.addEventListener('DOMContentLoaded', ()=>{

    document.body.appendChild(
        new HTMLCanvas.ViewGroup.Stage({
            container: document.body,
            id: 'stage', 
            scale: 20
        })
    );

    const svgContainer = initSVG({Views: XMLSVG.Views, COLORS});
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
                                                strokeStyle: COLORS.magenta.value,
                                                opacity: 0.25
                                            }
                                        });
                                    
                                    break;

                                }
                        }

                    /* === XMLSVG === */

                        if ( stage.grid ) transformSVG({HTMLCanvas, XMLSVG, parent: svgContainer}) ;
    
                    /* === XMLSVG === */
                    
                    endon:;});
            
        })

        // # This allows to init bitmap with internal context without waiting `window.onresize` to be triggered by end-user (or developer)
        window.dispatchEvent(new Event('resize'));

    endif:;}

});