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
                name: userConfigs.grid.name, hidden: !true, overrideContext: '2d', isSkewed: {sign: -1}
            })
            ,
            new HTMLCanvas.ViewGroup.Layer({
                name: 'grid.bitmaprenderer', hidden: !true, overrideContext: 'bitmaprenderer'
            })
            /* ,
            svgContainer */
        ])
        
    if ( HTMLCanvas.init({stage}) ) {

        /* === WORKER === */
        let worker = new Worker(`.${HTMLCanvas.Views.Grid.getNamespace()}`, { type: 'module' })
            // worker$offscreenGrid
            // .postMessage({
            //     canvas: offscreenGrid, 
            //     grid: { 
            //         GRIDCELL_DIM: stage.grid.GRIDCELL_DIM, 
            //         DPR: window.devicePixelRatio,
            //         isSkewed: stage.layers.grid.isSkewed
            //     }
            // }
            //     , [ offscreenGrid ]
            // )
        /* === WORKER === */

        window.on(EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        if ( context instanceof CanvasRenderingContext2D || context instanceof  ImageBitmapRenderingContext ) {
                                                                
                                switch (context.canvas.name) {
                
                                    case stage.layers.grid.name :

                                        // Create a new OffscreenCanvas with new size
                                        let offscreen = new OffscreenCanvas(1, 1);

                                        // Transfer the new OffscreenCanvas to the worker
                                        worker.postMessage({ 
                                            canvas: offscreen, 
                                            resize: {
                                                width: stage.layers.grid.width,
                                                height: stage.layers.grid.height,
                                            }
                                            ,
                                            grid: { 
                                                isSkewed: stage.layers.grid.isSkewed,
                                                GRIDCELL_DIM: stage.grid.GRIDCELL_DIM, 
                                                DPR: window.devicePixelRatio
                                            }
                                        }, [offscreen]);

                                                worker.addEventListener(EVENTS.message, (e)=>{

                                                    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                                                    // context.drawImage(e.data.bitmap, 0, 0, context.canvas.width, context.canvas.height);
                                                    // e.data.bitmap.close();

                                                    // ALTERNATIVELY:..

                                                    /**
                                                     * > NOTE: you do not need to call `close()` on the `ImageBitmap` instance: whenever you call transferFromImageBitmap(), browser automatically does free the resources,..
                                                     * .. the method called does itself automatically "consume" the `ImageBitmap`, meaning ownership is transferred, and the `ImageBitmap` is no longer valid after the call
                                                     */
                                                    let HOVER_ME_1;
                                                    if (e.data.resizedBitmap){

                                                        try {
                                                            stage.layers['grid.bitmaprenderer'].getContext('bitmaprenderer').transferFromImageBitmap(e.data.resizedBitmap)
                                                        } catch (error) {
                                                            // // DEV_NOTE # we deliberately suppress console, however expect 'InvalidStateError' whatsoever
                                                            // if (error.name === 'InvalidStateError') {
                                                            //     console.info("ImageBitmap is detached.");
                                                            // } else {
                                                            //     console.warn("An unexpected error occurred:", error);
                                                            // }
                                                        }
                                                        
                                                    }

                                                });

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