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
                name: userConfigs.grid.name, hidden: !true, overrideContext: '2d'
            })
            ,
            new HTMLCanvas.ViewGroup.Layer({
                name: 'grid.bitmaprenderer', hidden: !true, overrideContext: 'bitmaprenderer'
            })
            ,
            svgContainer
        ])
        
    if ( HTMLCanvas.init({stage}) ) {

        window.on(EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        if ( context instanceof (CanvasRenderingContext2D || ImageBitmapRenderingContext) ) {
                                                                
                                switch (context.canvas.name) {
                
                                    case stage.layers.grid.name :

                                        const offscreenGrid = new OffscreenCanvas(context.canvas.width, context.canvas.height);
                                            const worker$offscreenGrid = new Worker(`.${HTMLCanvas.Views.Grid.getNamespace()}`, { type: 'module' })
                                                worker$offscreenGrid
                                                .postMessage({
                                                    canvas: offscreenGrid, 
                                                    grid: { 
                                                        GRIDCELL_DIM: stage.grid.GRIDCELL_DIM, 
                                                        DPR: window.devicePixelRatio 
                                                    }
                                                }
                                                    , [ offscreenGrid]
                                                )

                                                worker$offscreenGrid.addEventListener(EVENTS.message, (e)=>{
                                                    
                                                    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                                                    // context.drawImage(e.data.bitmap, 0, 0, context.canvas.width, context.canvas.height);
                                                    // e.data.bitmap.close();

                                                    // ALTERNATIVELY:..

                                                    /**
                                                     * > NOTE: you do not need to call `close()` on the `ImageBitmap` instance: whenever you call transferFromImageBitmap(), browser automatically does free the resources,..
                                                     * .. the method called does itself automatically "consume" the `ImageBitmap`, meaning ownership is transferred, and the `ImageBitmap` is no longer valid after the call
                                                     */
                                                    let HOVER_ME_1;
                                                    stage.layers['grid.bitmaprenderer'].getContext('bitmaprenderer').transferFromImageBitmap(e.data.bitmap)

                                                })

                                        // if (
                                        //     HTMLCanvas.Views.Grid.draw({
                                        //         context,
                                        //         options: {
                                        //         /* === DEVELOPER IS WELCOME TO MODIFY: === */
                                        //             ...userConfigs.grid
                                        //         /* === DEVELOPER IS WELCOME TO MODIFY; === */
                                        //         }
                                        //     })
                                        // ) 
                                        
                                        transformSVG({HTMLCanvas, XMLSVG, parent: svgContainer}) ;
                                    
                                    break;

                                }
                        }
                    
                    });
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(EVENTS.resize));

    }

});