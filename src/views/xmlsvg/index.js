import './DOMutils.js';
import { enableDraggingFor } from './modules/index.js';
import { svg_container } from './svg-container/index.js';
import { svg_path } from './svg-path/index.js';
import { svg_rect } from './svg-rect/index.js';
import { svg_circle } from './svg-circle/index.js';

export class XMLSVG {

    static ViewGroup = {
        Container: customElements.get(svg_container)
    }

    static Views = {
        Path: customElements.get(svg_path),
        Rect: customElements.get(svg_rect),
        Circle: customElements.get(svg_circle)
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

        Object.freeze(this.ViewGroup);
        Object.freeze(this.Views);
        Object.freeze(this.Helpers);

    }

}

