/**
 * @returns `true`, whilst setting the styles for bound `this` target element
*/
export default function () {

    /**
     * @arbitrary
     */
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