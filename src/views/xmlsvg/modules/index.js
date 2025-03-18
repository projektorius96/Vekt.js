/**
 * 
 * @param {EventTarget} currentTarget - EventTarget-exposed `currentTarget` property
 * @returns {void} Enables the dragging for the `currentTarget`; _Press and keep Alt, whilst dragging the `currentTarget` with pointer (e.g. mouse)_; **NOTE**: you may need to double click on the `currentTarget` before start dragging procedure...
 */
export function enableDraggingFor(currentTarget, currentMatrixFn){

    let targetElement = null;
    function mousemove(e){

        switch (currentTarget.tagName) {
            case 'circle':
                document.getElementById(currentTarget.id).setAttribute('cx', e.pageX)
                document.getElementById(currentTarget.id).setAttribute('cy', e.pageY)
                break;
            case 'path':
                /* document.getElementById(currentTarget.id).setAttribute('transform', `translate(${e.pageX}, ${e.pageY})`) */// [FAILING] # resets the rest of transform, instead:..
                document.getElementById(currentTarget.id).setAttribute("transform", currentMatrixFn({x: e.pageX, y: e.pageY}).toString());
                break;
            case 'rect':
                document.getElementById(currentTarget.id).setAttribute('x', e.pageX)
                document.getElementById(currentTarget.id).setAttribute('y', e.pageY)
                break;
        }

    }
    function mouseup(){
        document.rm('mousemove', mousemove);
        targetElement = null;
    }
    function mousedown(e){
        if (targetElement === null) {
            targetElement = e.currentTarget;
        }
        const { altKey } = e;
        if    ( altKey )   {
            e.preventDefault();
            document.on('mousemove', mousemove);
        } 
    }
    currentTarget.on('mousedown', mousedown);
    document.on('mouseup', mouseup);

}