import { userConfigs, initSVG, transformSVG, ENUMS } from './implementation/index.js';
import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import package_json from './package.json' with { type: 'json' };

/**
 * @alias
 */
let EVENTS = ENUMS;

document.addEventListener(EVENTS.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    document.body.appendChild(
        new HTMLCanvas.ViewGroup.Stage({
                ...userConfigs.canvas
        })
    );

    const
        svgContainer = initSVG({XMLSVG, HTMLCanvas})
        ;
        document.body.children.stage?.add([
            new HTMLCanvas.ViewGroup.Layer({
                name: userConfigs.grid.name, hidden: !true
            })
            ,
            svgContainer
        ])

    if ( HTMLCanvas.init({stage}) ) {

        window.on(EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        if ( context instanceof CanvasRenderingContext2D ) {
                                                                
                                switch (context.canvas.name) {
                
                                    case stage.layers.grid.name :

                                        if (
                                            HTMLCanvas.Views.Grid.draw({
                                                context,
                                                options: {
                                                /* === DEVELOPER IS WELCOME TO MODIFY: === */
                                                    ...userConfigs.grid
                                                /* === DEVELOPER IS WELCOME TO MODIFY; === */
                                                }
                                            })
                                        ) transformSVG({HTMLCanvas, XMLSVG, parent: svgContainer}) ;
                                    
                                    break;

                                }
                        }
                    
                    });
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(EVENTS.resize));

    }

});