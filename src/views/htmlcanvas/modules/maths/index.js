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