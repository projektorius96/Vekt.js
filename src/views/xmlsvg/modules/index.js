/**
 * @example
 * 
 * ENUM.give;  //  'give'
 * ENUM.me;    //  'me'
 * ENUM.value; //  'value'
*/
const 
    ENUM = 
    new Proxy( Object.create(null) , {
        get(nil, key){
            return (
                key = `${key}`
            );
        }
    })
    ,
    /**
        * @alias
    */
    [SHAPE, ATTR, UI_EVENT] = Array(3).fill(ENUM);
    ;

export { ENUM }

export function getNamespace(import_meta_url) {

    return (
        new URL(import_meta_url).pathname.split('/').at(-2)
    );

}

/**
 * > NOTE: This function does set up `viewBox` attribute for an instance of `SVGElement` or other relevant interface(s)
 * 
 * @returns 
 */
export function setCoords() {

    const 
        svgElement = this.firstElementChild
        ,
        viewBox = svgElement.viewBox.baseVal
        ;

        svgElement.setAttribute(ATTR.viewBox, `${0} ${0} ${Math.ceil(window.innerWidth)} ${Math.ceil(window.innerHeight)}`)
        
    return ({
        getViewBox(){
            return viewBox
        }
    });
    
}

/**
 * 
 * @param {Array} points - list of points comprising a `path`, where such `path` is assigned to `SVGPathElement.attributes.d` internally;
 * @returns {SVGPathElement.attributes.d} path
 */
export function setPoints(points = []) {
    
    if (points.length === 0) return "";
        let path = `M 0 0`;
            points.forEach((point, i) => {
                if (i > 0){
                    path += ` L ${point.x} ${point.y}`;
                }
            });
    
    return path;

}

/**
 * @param {EventTarget} `currentTarget` - EventTarget-exposed `currentTarget` property
 * @returns {void} Enables the dragging for the `currentTarget` (hereinafter - shape); 
 * 
 * @example
 * Press and keep Alt and start dragging a `shape` with pointer (e.g. mouse); the very first time before start dragging, you may need to double click on the `shape` to make it happen...
 */
export function enableDraggingFor(currentTarget, currentMatrixFn){

    let targetElement = null;
    function mousemove(e){

        switch ( currentTarget.tagName ) {
            case SHAPE.path :
                document.getElementById(currentTarget.id)
                    .setAttribute( ATTR.transform , currentMatrixFn({x: e.pageX, y: e.pageY}).toString() );
            break ;
            case SHAPE.circle :
                document.getElementById(currentTarget.id).setAttribute('cx', e.pageX)
                document.getElementById(currentTarget.id).setAttribute('cy', e.pageY)
                break;
            case SHAPE.rect :
                document.getElementById(currentTarget.id).setAttribute('x', e.pageX)
                document.getElementById(currentTarget.id).setAttribute('y', e.pageY)
            break ;
        }

    }
    function mouseup(){
        document.rm(UI_EVENT.mousemove, mousemove);
        targetElement = null;
    }
    function mousedown(e){
        if (targetElement === null) {
            targetElement = e.currentTarget;
        }
        const { altKey } = e;
        if    ( altKey )   {
            e.preventDefault();
            document.on(UI_EVENT.mousemove, mousemove);
        } 
    }
    currentTarget.on(UI_EVENT.mousedown, mousedown);
    document.on(UI_EVENT.mouseup, mouseup);

}