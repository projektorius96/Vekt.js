/**
 * @see {@link https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html|jsdocs-cheatsheet}
 */
let HOVER_ME_0;

/**
 * @example
 * ENUMS.red.value; // 'red'
 * ENUMS.green.value; // 'green'
 * ENUMS.blue.value; // 'blue'
*/
let HOVER_ME_1;
export const
    NULL = Object.create(null)
    ,
    ENUMS = 
    new Proxy(NULL, {
        get(nil, key){
            return ({
                value: `${key}`
            });
        }
    })
    ;
