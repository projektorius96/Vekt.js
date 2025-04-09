import { HTMLCanvas, XMLSVG } from './src/views/index.js';
import diffContext, { ENUMS, userConfigs, initSVG, transformSVG, diffPoints, setGUIAction } from './implementation/index.js';
import { initGUIRange, waveConfig , gridConfig } from './implementation/GUI/index.js';

import package_json from './package.json' with { type: 'json' };

const
    { CASE, COLOR, SHAPE, UI_EVENTS } = ENUMS
    ,
    { setRange, Converters } = HTMLCanvas.Helpers.Trigonometry
    ;

document.on(UI_EVENTS.DOMContentLoaded, ()=>{

    document.title = package_json.name;

    const 
        stage = new HTMLCanvas.ViewGroup.Stage({...userConfigs.stage});
            stage.append(...[
                new HTMLCanvas.ViewGroup.Layer({...userConfigs.grid})
                ,
                initSVG({XMLSVG, HTMLCanvas})
            ]);

    const
        GUIRange 
            = initGUIRange({id: 'wave', container: stage.parentElement, position: 'right', draggable: true});

    window.on(UI_EVENTS.resize, ()=>{

        GUIRange.grid.scale.element.on(UI_EVENTS.input, function(){
            
            // DEV_NOTE # technically, this is redundant, but consistency matters, thus overriding
            gridConfig.scale = Number( this.value ) ;
            /**
             * @override
             */
            Object.assign( stage , { scale: gridConfig.scale } )

            HTMLCanvas
                .init({stage})
                    .on(diffContext.bind(null, {HTMLCanvas, XMLSVG, transformSVG, userConfigs}));


        }); GUIRange.grid.scale.element.dispatch( new Event(UI_EVENTS.input) ); 

        GUIRange.wave.all
            .forEach(
                setGUIAction[CASE.waveConfig].bind(null, { Converters, setRange })
            )
        ;
        
    })

    // DEV_NOTE (!) # This allows to initiate `<canvas>` hosted "bitmap" with internal context without waiting `window.onresize` to be triggered by end-user
    window.dispatch(new Event(UI_EVENTS.resize));

});