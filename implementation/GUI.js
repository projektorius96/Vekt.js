import { Pane, Input, Label } from "wc-pane";

export 
    const initGUI = ({container = document.body})=> {

        const 
            gui = new Pane({container})
            ,
            freqLabel = new Label('frequency');
        ;
        gui.addGroup({name: freqLabel.textContent, open: true, nodes: gui.addSection({accessor: 'slot', sectionCount: 1})})
        
            const rangeParams = {
                min: 1,
                max: 60,
                step: 1,
                value: 1
            }
        
            gui.find({name: freqLabel.textContent}).children.slot1
                .append(...[
                    new Input({name: 'frequency', attrs: {...rangeParams}})
                ]);

            gui.getInput({name: freqLabel.textContent}).on('input', function(){
                /* console.log( Number(this.value) ) */// # [PASSING]
                
            })
        
    }
    ;

