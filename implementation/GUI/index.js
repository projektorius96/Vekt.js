import { Pane, Input, Label } from "wc-pane";

export const waveConfig = {
    periods : 1
    ,
    frequency: 3
    ,
    amplitude : -1
}

export 
    const 
        initGUIRange = function(){

        const 
            gui = new Pane(...arguments)
        ;

        const [
                freqLabel, amplitudeLabel
            ] = [
                new Label('frequency'), new Label('amplitude')
            ];


            let wave_bindings = gui.addGroup({
                name: 'wave-bindings', 
                open: true, 
                nodes: gui.addSection({accessor: 'slot', sectionCount: 1})
            })
        

            // DEV_NOTE # children.slotN where N is integer no less than 1, and whose greatest value is equal to `sectionCount`
            gui.find(wave_bindings).children.slot1
                .append(...[
                    ...Array(
                        freqLabel,
                        new Input({
                            name: freqLabel.textContent, 
                            attrs: {
                                min: 1,
                                max: 60,
                                step: 1,
                                value: waveConfig.frequency
                            }
                        })
                    )
                    ,
                    ...Array(
                        amplitudeLabel,
                        new Input({
                            name: amplitudeLabel.textContent,
                            attrs: {
                                min: -1,
                                max: 1,
                                step: 0.1,
                                value: waveConfig.amplitude
                            }
                        })
                    )
                    ,
                ]);

            return ({
                wave: {
                    [freqLabel.textContent] : {
                        element: gui.find({name: freqLabel.textContent})
                    }
                    ,
                    [amplitudeLabel.textContent] : {
                        element: gui.find({name: amplitudeLabel.textContent})
                    }
                    ,
                }
            })
        
        }
        ;

