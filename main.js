import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import { ENUMS, userConfigs, initSVG, transformSVG, diffPoints } from './implementation/index.js';
import { initGUIRange, waveConfig } from './implementation/GUI/index.js';

import package_json from './package.json' with { type: 'json' };

const { CASE, COLORS, SHAPE, UI_EVENTS } = ENUMS;
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

                const gui = initGUIRange({container: stage.parentElement, position: 'right', draggable: true});
    
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

                    Array.of(...[
                        gui.wave.frequency, 
                        gui.wave.amplitude, 
                        gui.wave.periods
                    ]).forEach(({ element })=>{

                            switch (element.name) {
                                case CASE.frequency :
                                    element.on(UI_EVENTS.input, function(){

                                        waveConfig[CASE.frequency] = Number( this.value )

                                        document.querySelector('path').setPoints([
                                            ...diffPoints({
                                                Converters, 
                                                setRange,
                                                resource: { 
                                                    name: SHAPE.smooth_wave, 
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
                                    element.on(UI_EVENTS.input, function(){

                                        waveConfig[CASE.amplitude] = Number( this.value )

                                        document.querySelector(SHAPE.path).setPoints([
                                            ...diffPoints({
                                                Converters, 
                                                setRange,
                                                resource: { 
                                                    name: SHAPE.smooth_wave, 
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
                                case CASE.periods :
                                    element.on(UI_EVENTS.input, function(){
                                        
                                        waveConfig[CASE.periods] = Number( this.value )

                                        document.querySelector(SHAPE.path).setPoints([
                                            ...diffPoints({
                                                Converters, 
                                                setRange,
                                                resource: { 
                                                    name: SHAPE.smooth_wave, 
                                                    waveConfig: {
                                                        ...waveConfig
                                                        ,
                                                        /**
                                                         * @override
                                                         */
                                                        periods: waveConfig[CASE.periods]
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