import Vekt from './src/views/index.js';

const { HTMLCanvas, XMLSVG } = Vekt;

/* console.log(HTMLCanvas.default.ViewGroup);
console.log(XMLSVG.default.Views); */// # [PASSING]

document.addEventListener('DOMContentLoaded', ()=>{

    document.body.appendChild(
        Reflect.construct(
            HTMLCanvas.default.ViewGroup.Stage
            ,
            ArgsList({
                container: document.body,
                id: 'stage', 
                scale: 20
            })
        )
    );

});