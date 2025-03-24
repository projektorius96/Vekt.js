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

export function diffShape({resource = 'circle', setRangeFn, Converters}) {

    let stepBasis = 1;
    switch (resource) {
        case 'circle' :
            return (
                setRangeFn(0, stepBasis, 720).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            );
        case 'square' :
            return (
                setRangeFn(0, stepBasis*90, 720).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'right_triangle' :
            return (
                setRangeFn(0, stepBasis*270, 720).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'isosceles' :
            return (
                setRangeFn(0, stepBasis*300, 720).map((deg)=>{
                    return {
                        x: 1 * Math.cos( Converters.degToRad( deg ) ),
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'smooth_wave':
            return (
                setRangeFn(0, stepBasis*1, 360).map((deg)=>{
                    return {
                        x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
        case 'tooth_wave':
            return (
                setRangeFn(0, stepBasis*90, 360).map((deg)=>{
                    return {
                        x: 1 * /* Math.cos( */ Converters.degToRad( deg ) /* ) */,
                        y: 1 * Math.sin( Converters.degToRad( deg ) ),
                    }
                })
            )
        ;
    }

}

