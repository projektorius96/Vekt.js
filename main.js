import { userConfigs, initSVG, transformSVG, diffPoints, waveConfig, COLORS, SHAPE_TYPE, UI_EVENTS } from './implementation/index.js';
import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import package_json from './package.json' with { type: 'json' };

import { initGUIRange } from './implementation/GUI.js';

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

                const gui = initGUIRange({container: stage.parentElement});
                    gui.wave.frequency.element.on('input', function(){
                        /* console.log( Number(this.value) ) */// # [PASSING]
                        /* console.log(gui.wave.frequency.args) */// # [PASSING]
                        if ( window.dispatchEvent(new Event(UI_EVENTS.resize)) ){
                            /* console.log(document.querySelector('svg-container')) */// # [PASSING]
                            document.querySelector('path').setPoints([
                                ...diffPoints({
                                    Converters, 
                                    setRangeFn: setRange,
                                    resource: { 
                                        name: 'smooth_wave', 
                                        waveConfig: {
                                            ...waveConfig,
                                            frequency: Number( this.value )
                                        } 
                                    }
                                })
                            ])
                            
                        }
                        ;
                    }); gui.wave.frequency.element.dispatchEvent(new Event(UI_EVENTS.input))
    
        /* === GUI === */

        window.on(UI_EVENTS.resize, ()=>{

            HTMLCanvas
                .init({stage})
                    .on((context)=>{

                        // DEV_NOTE # because we mix HTML Canvas (CanvasRenderingContext2D) together with XML SVG, we must do the following check:..
                        if ( context instanceof CanvasRenderingContext2D ) {
                                                                
                                switch (context.canvas.id) {
                
                                    case SHAPE_TYPE.grid :

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
            
        })

        // # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
        window.dispatchEvent(new Event(UI_EVENTS.resize));

    }

});