import { setRange, degToRad } from "../modules/maths/index.js";

export class grid_view {

    static getNamespace(){
        return (
            (new URL(import.meta.url)).pathname
        )
    }

    /**
     * The `default.draw` static method takes single `Object` as its input whose properties are as follows:
     * @param {HTMLCanvasElement} `canvas` - a reference to `canvas` (_a.k.a. "Layer"_)
     * @param {Object} `options`           - options you have passed to shape's current `context` of the current `canvas` reference
     * @returns {CanvasRenderingContext2D} `context` - the modified `context` with a `grid` view "painted" on the `<canvas>` hosted bitmap
    */
    static draw({context, options}){

        let 
            gridcellDim = /* stage.grid.GRIDCELL_DIM */options.grid.GRIDCELL_DIM
            ,
            gridcellMatrix = setRange(0, gridcellDim, context.canvas.width)
            ;
        
        /**
         * @algorithm 3Din2D (part 1)
         */
        if (options.grid.isSkewed){

            context.setTransform(options.grid.DPR, 0, 0, options.grid.DPR, 0, 0);
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
            let sign = options.grid.isSkewed.sign || -1;
            let { a, b, c, d, e, f } = context.getTransform();
                let commonDivisor = 2;
                c = sign * 1  * options.grid.DPR;
                e = -1 * context.canvas.width/commonDivisor * options.grid.DPR
                Object.assign(options.grid.isSkewed, {
                    y: Math.sin( degToRad( (90 / commonDivisor) ) )
                })
            context.setTransform(a, b, c, d, e, f);
    
            /**
             * @algorithm 3Din2D (part 2)
             * @mediaqueries
             */
            if (context.canvas.width <= context.canvas.height && sign > 0) context.translate(-1 * context.canvas.width/4, 0) ;
            if (context.canvas.width <= context.canvas.height && sign < 0) context.translate(+1 * context.canvas.width/4, 0) ;
    
           /*  context.save() */
    
            if (options.overrides?.transform){
                if (options.overrides.transform?.translation){
                    let { x, y } = options.overrides.transform.translation;
                    context.translate(x, y)
                }
                if (options.overrides.transform?.angle){
                    context.rotate(options.overrides.transform.angle)
                    context.currentAngle = options.overrides.transform.angle;
                }
                if (options.overrides.transform?.scale){
                    let { x, y } = options.overrides.transform.scale;
                    context.scale(x, y);
                }
            }
    
            } else {
    
                /**
                 * @default
                 */
                context.setTransform(options.grid.DPR, 0, 0, options.grid.DPR, 0, 0);
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
            }
        
        /** {@link https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations} */
        function drawGrid(x, y, xLen = gridcellDim, yLen = gridcellDim) {

            if (options.dotted){
                const improveVisibility = (dot)=> dot = dot*options.grid.GRIDCELL_DIM/* stage.grid.GRIDCELL_DIM */;
                [xLen, yLen] = [1/gridcellDim, 1/gridcellDim].map(improveVisibility)

            } else {
                [xLen, yLen] = [1*gridcellDim, 1*gridcellDim]
            }

            context.beginPath();
            
            context.rect(x, y, xLen, yLen);
            context.kind = options?.kind || 'grid';
            context.lineWidth = options?.lineWidth || 1;
            context.strokeStyle = options?.strokeStyle || 1;
            options.hidden ? false : context.stroke();

        }

        let
            divisorX = Math.ceil( /* stage */context.canvas.width/* clientWidth  */ / gridcellDim )
            ,
            divisorY = Math.ceil( /* stage */context.canvas.height/* clientHeight */ / gridcellDim )
        ;
        ;[...new Array(divisorY)].map((v, row)=>{

            return v = 1+row;

        }).forEach((row)=>{

            gridcellMatrix.forEach((_, col)=>{

                if( row === 1/* if it's very 1st row, see cont'd... */ ){

                    drawGrid(gridcellDim * col, 0); /* [cont'd] ...fill the row */

                }

                drawGrid(gridcellDim * col, gridcellDim * row);
            
            });
        

        });



        return context;
    
    }

}

/* let offscreenCtx; */
self.onmessage = function (e) {    

    if (e.data.resize){
        
        const offscreen = new OffscreenCanvas(e.data.resize.width, e.data.resize.height);
        
        grid_view.draw({
            context: offscreen.getContext('2d'),
            options: {
                grid: {
                    ...e.data.grid
                }
            }
        });

        let resizedBitmap = offscreen.transferToImageBitmap();

        // // DEV_NOTE # send ImageBitmap to the main thread
        self.postMessage({ resizedBitmap } , [ resizedBitmap ]);

    }
    
}