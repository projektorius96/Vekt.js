globalThis.ArgsList = Array;
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;

export function getNamespace(import_meta_url) {

    return (
        new URL(import_meta_url).pathname.split('/').at(-2)
    );

}

export function setCoords() {

    const 
        svgElement = this.firstElementChild
        ,
        viewBox = svgElement.viewBox.baseVal
        ;

        svgElement.setAttribute('viewBox', `${0} ${0} ${Math.ceil(window.innerWidth)} ${Math.ceil(window.innerHeight)}`)
        
    return ({
        getViewBox(){
            return viewBox
        }
    });
    
}