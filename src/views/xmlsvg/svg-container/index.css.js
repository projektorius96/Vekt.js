/**
 * @returns `true`, whilst setting the styles for bound `this` target element
*/
export default function () {

    /**
     * @type
     * 
     * > **NOTE**: herein we're arbitrary accruing each letter's position in Latin's alphabet
     */
    let HOVER_ME;
        const [S, V, G] = [19, 22, 7];

    this.style.cssText = /* style */`
        width: calc(100vw - (100vw - 100%));
        height: 100vh;
        display: block;
        position: absolute;
        background: transparent;
        z-index: ${ [S, V, G].reduce( (prev, current) => (prev += current) )};
    `;

    return true;
    
}