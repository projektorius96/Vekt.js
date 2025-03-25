/**
 * @example
 * ENUMS.red; // 'red'
 * ENUMS.green; // 'green'
 * ENUMS.blue; // 'blue'
*/
let HOVER_ME_0;
    export const
        ENUMS = 
        new Proxy( Object.create(null) , {
            get(nil, key){
                return (`${key}`);
            }
        })
        ;

/**
 * @param  {Object}   `options`                   - the input this function accepts 
 * @param  {String}   [`options.resource`='circle'] - `resource` is symbolic name this function differentiates against (**see `switch` statement `case`s** for current available list of `resource`s) | Default: 'smooth_wave'
 * > **NOTE**: when it comes about `_wave` view to avoid its graphical artifacts, please phase it horizontally or vertically via `transformSVG` (see `../index.js`)

 * @param  {Function} `options.setRangeFn`        - function body passed
 * @return {Object}   `options.Converters`        - forwared `options.Converters` object, originally defined within "`HTMLCanvas`" named module export
 */
export function diffShape({resource = 'smooth_wave', setRangeFn, Converters}) {

    const 
        TAU = 360
        ,
        SNAP_TO_GRID = 1 / (1 / Math.sin(Math.PI/4))
        ;

    const waveConfig = {
        periods : 1
        ,
        frequency: 3
        ,
        amplitude : 4
    }
    
    let 
        stepBasis = 1
        ;

    switch (resource) {
        case 'circle' :
            return (
                setRangeFn(0, stepBasis, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        case 'square' :
            return (
                setRangeFn(0, stepBasis*90, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'right_triangle' :
            return (
                setRangeFn(0, stepBasis*270, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'isosceles' :
            return (
                setRangeFn(0, stepBasis*300, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'smooth_wave':
            return (
                setRangeFn(0, stepBasis*1, TAU * waveConfig.periods).map((deg)=>{
                    return {
                        x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                        y: (waveConfig.amplitude * SNAP_TO_GRID) * Math.sin( Converters.degToRad( deg )*waveConfig.frequency ),
                    }
                })
            )
        ;
        case 'triangle_wave':
            // DEV_NOTE # due to way this wrapper is built, to avoid graphical artifacts, please phase horizontally|vertically via `transformSVG` (see `../index.js`)
            return (
                setRangeFn(0, stepBasis*90, TAU * waveConfig.periods).map((deg)=>{
                    return {
                        x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                        y: (waveConfig.amplitude * SNAP_TO_GRID) * Math.sin( Converters.degToRad( deg )*waveConfig.frequency ),
                    }
                })
            )
        ;
    }

}

