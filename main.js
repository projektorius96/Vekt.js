import { userConfigs, initSVG, transformSVG, diffPoints, CASE, COLORS, SHAPE_TYPE, UI_EVENTS } from './implementation/index.js';
import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import package_json from './package.json' with { type: 'json' };

import { initGUIRange } from './implementation/GUI/index.js';
import { waveConfig } from './implementation/GUI/index.js';

document.addEventListener(UI_EVENTS.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const 
        { Converters } = HTMLCanvas.Helpers.Trigonometry
        ,
        { setRange } = HTMLCanvas.Helpers.Trigonometry
        ;

    document.body.appendChild(
        new HTMLCanvas.ViewGroup.Stage({
            ...userConfigs.stage
        })
    );

    const
        svgContainer = initSVG({XMLSVG, HTMLCanvas})
        ;
        document.body.children.stage?.add([
            new HTMLCanvas.ViewGroup.Layer({
                ...userConfigs.grid
            })
            ,
            svgContainer
        ])
        
    if ( HTMLCanvas.init({stage}) ) {

        /* === GUI === */

                const gui = initGUIRange({container: stage.parentElement, position: 'right'});
    
        /* === GUI === */

        window.on(UI_EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        // DEV_NOTE # because we mix HTML Canvas (CanvasRenderingContext2D) together with XML SVG, we must do the following check:..
                        if ( context instanceof CanvasRenderingContext2D ) {
                                                                
                                switch (context.canvas.id) {
                
                                    case CASE.grid :

                                        if (
                                            HTMLCanvas.Views.Grid.draw({
                                                context, 
                                                options: {
                                                    ...userConfigs.grid,
                                                    /**
                                                     * @override
                                                     */
                                                    strokeStyle: COLORS.blue
                                                }}
                                            )
                                        ) transformSVG({HTMLCanvas, XMLSVG, parent: svgContainer}) ;

                                    break;

                                }
                        }
                    
                    });

                    Array.of(gui.wave.frequency.element, gui.wave.amplitude.element)
                        .forEach((wave)=>{

                            switch (wave.name) {
                                case CASE.frequency :
                                    wave.on(UI_EVENTS.input, function(){

                                        waveConfig[CASE.frequency] = Number( this.value )

                                        document.querySelector('path').setPoints([
                                            ...diffPoints({
                                                Converters, 
                                                setRangeFn: setRange,
                                                resource: { 
                                                    name: SHAPE_TYPE.smooth_wave, 
                                                    waveConfig: {
                                                        ...waveConfig
                                                        ,
                                                        /**
                                                         * @override
                                                         */
                                                        frequency: waveConfig[CASE.frequency]
                                                    } 
                                                }
                                            })
                                        ]);
                                    });
                                break;
                                case CASE.amplitude :
                                    wave.on(UI_EVENTS.input, function(){

                                        waveConfig[CASE.amplitude] = Number( this.value )

                                        document.querySelector(SHAPE_TYPE.path).setPoints([
                                            ...diffPoints({
                                                Converters, 
                                                setRangeFn: setRange,
                                                resource: { 
                                                    name: SHAPE_TYPE.smooth_wave, 
                                                    waveConfig: {
                                                        ...waveConfig
                                                        ,
                                                        /**
                                                         * @override
                                                         */
                                                        amplitude: waveConfig[CASE.amplitude]
                                                    } 
                                                }
                                            })
                                        ]);
                                    });
                                break;
                            }

                        })
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(UI_EVENTS.resize));

    }

});