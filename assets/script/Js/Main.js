var stageWidth=320;
var stageHeight=440;

var contr = new strz_console.CanvasController({
    width   : stageWidth,
    height  : stageHeight,
    baseDir : 'assets/script/Js',
    visualizations:{
        //command : [class, count, args]

        'A':[SimpleVisOOP, 1, {}],
        'B':[BinaryTextVisOOP, Infinity, {}],
        'C':[Label, Infinity, {}]
    },
    visualizationOrder:{
        play    :'loop',
        start   :'A'//starting index not counting down in first show
    }
});
contr.run();