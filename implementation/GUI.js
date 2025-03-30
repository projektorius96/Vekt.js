import { Pane, Input, Label } from "wc-pane";

export 
    const 
        initGUIRange = ({container = document.body})=> {

        const waveAttrs = {
            min: 1,
            max: 60,
            step: 1,
            value: 1
        }

        const 
            gui = new Pane({container})
            ,
            freqLabel = new Label('frequency');
        ;
        gui.addGroup({name: freqLabel.textContent, open: true, nodes: gui.addSection({accessor: 'slot', sectionCount: 1})})
        
            // DEV_NOTE # children.slotN where N is integer no less than 1, and whose greatest value is equal to `sectionCount`
            gui.find({name: freqLabel.textContent}).children.slot1
                .append(...[
                    new Input({
                        name: 'frequency', 
                        attrs: {
                            ...waveAttrs
                        }
                    })
                ]);

            return ({
                wave: {
                    [freqLabel.textContent] : {
                        args: waveAttrs,
                        element: gui.getInput({name: freqLabel.textContent})
                    }
                }
            })
        
        }
        ;

