import './utils.js';
import { enableDraggingFor } from './modules/index.js';
import { svg_container } from './svg-container/index.js';
import { svg_circle } from './svg-circle/index.js';
import { svg_rect } from './svg-rect/index.js';
import { svg_path } from './svg-path/index.js';

export class XMLSVG {

    static Views = {
        Container: customElements.get(svg_container),
        Circle: customElements.get(svg_circle),
        Rect: customElements.get(svg_rect),
        Path: customElements.get(svg_path),
    }

    static Helpers = {
        findBy(id){
            return (
                document?.getElementById(id)
            )
        }
    }

    static 'enableDraggingFor' = enableDraggingFor;

    static {

        Object.freeze(this.Views);
        Object.freeze(this.Helpers);

    }

}

