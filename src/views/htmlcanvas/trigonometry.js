/**
 * @param {Number} angle - number in angle degrees, internally converted to radians
 * @returns current rotation matrix (in clockwise direction by default, unless negative values is fed)
 */
export function setAngle(angle) {

    const cos = Math.cos( degToRad( angle ) );
    const sin = Math.sin( degToRad( angle ) );

    let x11 = cos; 
    let y12 = sin;
    let x21 = -sin;
    let y22 = cos;

    return (
        [x11, y12, x21, y22].map((component)=> component *= window.devicePixelRatio)
    );

}

/**
 * @param {Number} deg - angle degrees, hence `"deg"`
 * @returns takes a `Number` in angle degrees (`deg`) and converts them `to` `Rad`ians
 */
export function degToRad(deg){
    return (
        deg * (Math.PI / 180)
    )
}