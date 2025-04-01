import { Pane, Input, Label } from "wc-pane";

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
                periods
                , 
                frequency
                , 
                amplitude
            ] = [
                new Label('periods')
                , 
                new Label('frequency')
                , 
                new Label('amplitude')
            ];


            const wave = gui.addGroup({
                name: 'wave-bindings', 
                open: true, 
                nodes: gui.addSection({accessor: 'slot', sectionCount: 1})
            })

            /**
             * > EXAMPLE: Herein "`children.slot`N" where `N` is integer no less than 1, and whose greatest value is equal to `sectionCount`
             */
            let EXAMPLE_1;
            gui.find(wave).children.slot1
                .append(...[
                    ...Array(
                        frequency,
                        new Input({
                            name: frequency.text,
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
                        amplitude,
                        new Input({
                            name: amplitude.text,
                            attrs: {
                                min: -1,
                                max: 1,
                                step: 0.1,
                                value: waveConfig.amplitude
                            }
                        })
                    )
                ]);

                gui.find(wave).children.slot1.append(...[
                    ...Array(
                        periods,
                        new Input({
                            name: periods.text,
                            attrs: {
                                min: 0,
                                max: 1,
                                /* DEV_NOTE # this configuration of ever-growing stroked wave view, is a true hidden gem !!!  */
                                step: (1 / Number( gui.find({name: frequency.textContent}).max )),
                                value: waveConfig.periods
                            }
                        })
                    )
                ])

            return ({
                wave: {
                    [frequency.text] : {
                        element: gui.find({name: frequency.text})
                    }
                    ,
                    [amplitude.text] : {
                        element: gui.find({name: amplitude.text})
                    }
                    ,
                    [periods.text] : {
                        element: gui.find({name: periods.text})
                    }
                    ,
                }
            })
        
        }
        ;

