/**
 * @example
 * ENUM.give; // 'give'
 * ENUM.me; // 'me'
 * ENUM.value; // 'value'
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

    /** @alias */
    const
        CASE = ENUM;

/**
 * @param  {Object}   `options`                   - the input this function accepts 
 * @param  {String}   `options.resource`          - `resource` is symbolic name this function differentiates against (**see `switch` statement `case`s** for current available list of `resource`s)
 * > **NOTE**: when it comes about `_wave` view to, avoid its graphical artifacts, please phase it horizontally or vertically via `transformSVG` (see `../index.js`)

 * @param  {Function} `options.setRange`          - forwared `options.setRange` Function
 * @return {Object}   `options.Converters`        - forwared `options.Converters` Object, originally defined within the the source of "`HTMLCanvas`" named module export
 */
export function diffPoints({resource, setRange, Converters}) {

    const 
        TAU = 360
        ,
        SNAP_TO_GRID = 1 / (1 / Math.sin(Math.PI/4))
        ,
        STEP_BASIS = 1
        ;

    switch (resource.name) {
        case CASE.circle :
            return (
                setRange(0, STEP_BASIS, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        break;
        case CASE.square :
            return (
                setRange(0, STEP_BASIS*90, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        break;
        case CASE.right_triangle :
            return (
                setRange(0, STEP_BASIS*270, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        break;
        case CASE.isosceles :
            return (
                setRange(0, STEP_BASIS*300, TAU*2).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        break;
        case CASE.smooth_wave :                    
            if ( resource.waveConfig ){
                return (
                    setRange(0, STEP_BASIS*1, TAU*resource.waveConfig.periods).map((deg)=>{
                        return {
                            x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                            y: (resource.waveConfig.amplitude * SNAP_TO_GRID) * Math.sin( Converters.degToRad( deg )*resource.waveConfig.frequency ),
                        }
                    })
                );
            }
        break;
        case CASE.triangle_wave :
            // DEV_NOTE # due to way this wrapper is built, to avoid graphical artifacts, please phase horizontally|vertically via `transformSVG` (see `../index.js`)
            if ( resource.waveConfig ){
                return (
                    setRange(0, STEP_BASIS*90, TAU * resource.waveConfig.periods).map((deg)=>{
                        return {
                            x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                            y: (resource.waveConfig.amplitude * SNAP_TO_GRID) * Math.sin( Converters.degToRad( deg )*resource.waveConfig.frequency ),
                        }
                    })
                );
            }
        break;
    }

}

