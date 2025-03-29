/**
 * @example
 * ENUMS.give; // 'give'
 * ENUMS.me; // 'me'
 * ENUMS.value; // 'value'
*/
let HOVER_ME_0;
    export const
        ENUM = 
        new Proxy( Object.create(null) , {
            get(nil, key){
                return (`${key}`);
            }
        })
        ;

/**
 * @param  {Object}   `options`                   - the input this function accepts 
 * @param  {String}   `options.resource`          - `resource` is symbolic name this function differentiates against (**see `switch` statement `case`s** for current available list of `resource`s) | Default: 'smooth_wave'
 * > **NOTE**: when it comes about `_wave` view to, avoid its graphical artifacts, please phase it horizontally or vertically via `transformSVG` (see `../index.js`)

 * @param  {Function} `options.setRangeFn`        - function body passed
 * @return {Object}   `options.Converters`        - forwared `options.Converters` object, originally defined within "`HTMLCanvas`" named module export
 */
export function diffShape({resource, setRangeFn, Converters}) {

    const 
        TAU = 360
        ,
        SNAP_TO_GRID = 1 / (1 / Math.sin(Math.PI/4))
        ,
        STEP_BASIS = 1
        ;

    /* === GUI === */
        const waveConfig = {
            periods : 1
            ,
            frequency: 3
            ,
            amplitude : 4
        }
    /* === GUI === */

    switch (resource) {
        case 'circle' :
            return (
                setRangeFn(0, STEP_BASIS, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        case 'square' :
            return (
                setRangeFn(0, STEP_BASIS*90, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'right_triangle' :
            return (
                setRangeFn(0, STEP_BASIS*270, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'isosceles' :
            return (
                setRangeFn(0, STEP_BASIS*300, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'smooth_wave':
            return (
                setRangeFn(0, STEP_BASIS*1, TAU * waveConfig.periods).map((deg)=>{
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
                setRangeFn(0, STEP_BASIS*90, TAU * waveConfig.periods).map((deg)=>{
                    return {
                        x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                        y: (waveConfig.amplitude * SNAP_TO_GRID) * Math.sin( Converters.degToRad( deg )*waveConfig.frequency ),
                    }
                })
            )
        ;
    }

}

