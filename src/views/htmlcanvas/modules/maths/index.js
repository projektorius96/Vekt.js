/**
 * @param {Number} angle - user-friendly value in angle degrees
 * @param {Number} [x=0] - default component of ({x,y}) ordered pair  
 * @param {Number} [y=0] - default component of ({x,y}) ordered pair
 * 
 * @returns {Array} _this function generates a raw homogeneous matrix_
 */
export function setTransform(angle, x=0, y=0) {

    const cos = Math.cos( degToRad( angle ) );
    const sin = Math.sin( degToRad( angle ) );

    let x11 = cos; 
    let y12 = sin;
    let x21 = -sin;
    let y22 = cos;
    let z31 = x;
    let z32 = y;

    return (
        [x11, y12, x21, y22, z31, z32]
    );

}

/**
 * @param {Number} deg - angle degrees, hence `"deg"`
 * @returns takes a the input and converts it to raw number in radians
 */
export function degToRad(deg){
    return (
        deg * (Math.PI / 180)
    )
}

/**
 * @param {Number} rad - in radians (_optionally in `Math.PI` rad_), hence `"rad"` 
 * @returns takes the input and converts it to "user-friendly" angle degrees
 */
export function radToDeg(rad){
    return (
        rad * (180 / Math.PI)
    )
}

/**
 * @param {Number} start - range lower bound ;
 * @param {Number} step  - range step bound  ;
 * @param {Number} end   - range upper bound ;
 * @param {Boolean} [isIncluded=true] - isIncluded === true ? [start:end] : [start:end) ;
 * @param {Array} [skip=Array]        - useful for some trigonometry calls such as Math.cos at discrete { 90 | 270 } angle degree units, e.g. when Math.cos resolves to undefined, to avoid such scenario we have this exposed param ;
 * @returns {Array} range if { [start:end) when isIncluded := false | [start:end] when isIncluded := true } : default is when "isIncluded := true" ;
 */
export function setRange(start, step, end, isIncluded=true, skip = []){
    
    const range = [];
    
    loop1: for (start; start < end + isIncluded; start += step) {

        loop2: for (let items of skip) {

            if (items == start) {

                continue loop1;

            }

        }

        range.push(start)

    }

    return range;
    
}