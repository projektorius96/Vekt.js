import gridConfig from './configs/grid.json' with { type: 'json' };
import waveConfig from './configs/wave.json' with { type: 'json' };
import { Pane, Input, Label } from "wc-pane";

export {
    gridConfig,
    waveConfig
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
                new Label('amplitude'),
            ];

            const 
                wave = gui.addGroup({
                    name: 'wave-bindings', 
                    open: true, 
                    nodes: gui.addSection({accessor: 'slot', sectionCount: 1})
                })
            const
                grid = gui.addGroup({
                    name: 'grid-bindings',
                    open: false,
                    nodes: gui.addSection({accessor: 'slot', sectionCount: 1}),
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

                // DEV_NOTE # we must init above as the below depends on above, thus a separate `append` call
                gui.find(wave).children.slot1.append(...[
                    ...Array(
                        periods,
                        new Input({
                            name: periods.text,
                            attrs: {
                                min: 0,
                                max: 1,
                                /* DEV_NOTE # this configuration of ever-growing stroked wave view, is a true hidden gem !!!  */
                                step: (1 / Number( gui.find({name: frequency.text}).max )),
                                value: waveConfig.periods
                            }
                        })
                    )
                ])
                
                const gridLabel = new Label('scale')
                gui.find(grid).children.slot1.append(...[
                    ...Array(
                        gridLabel,
                        new Input({
                            name: gridLabel.text,
                            attrs: {
                                min: 1,
                                max: gridConfig.scale * 2,
                                step: 1,
                                value: gridConfig.scale
                            }
                        })
                    )
                ])

            return ({
                grid : {
                    [gridLabel.text] : {
                        element: gui.find({name: gridLabel.text})
                    }
                }
                ,
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
                    all: [
                        gui.find({name: frequency.text}),
                        gui.find({name: amplitude.text}),
                        gui.find({name: periods.text})
                    ]
                }
            })
        
        }
        ;

