import { Pane, Input, Label } from "wc-pane";
import { ENUM } from "../primitives.js";

export const waveConfig = {
    periods : 0.5
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
                periodsLabel
                , 
                freqLabel
                , 
                amplitudeLabel
            ] = [
                new Label(ENUM.periods)
                , 
                new Label(ENUM.frequency)
                , 
                new Label(ENUM.amplitude)
            ];


            let wave_bindings = gui.addGroup({
                name: 'wave-bindings', 
                open: true, 
                nodes: gui.addSection({accessor: ENUM.slot, sectionCount: 1})
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
                ]);

                gui.find(wave_bindings).children.slot1.append(...[
                    ...Array(
                        periodsLabel,
                        new Input({
                            name: periodsLabel.textContent,
                            attrs: {
                                min: 0,
                                max: 1,
                                /* DEV_NOTE # this configuration of ever-growing stroked wave view, is a true hidden gem !!!  */
                                step: (1 / Number( gui.find({name: freqLabel.textContent}).max )),
                                value: waveConfig.periods
                            }
                        })
                    )
                ])

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
                    [periodsLabel.textContent] : {
                        element: gui.find({name: periodsLabel.textContent})
                    }
                    ,
                }
            })
        
        }
        ;

