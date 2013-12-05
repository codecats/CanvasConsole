var stageWidth=320;
var stageHeight=440;

var contr = new strz_console.CanvasController({
    width   : stageWidth,
    height  : stageHeight,
    baseDir : 'assets/script/Js',
    visualizations:{
        //command : [class, count, args]

        'MATH':[strzVis.Math, 1, {}],
        'CODE':[strzVis.Code, Infinity, {}],
        'CATS':[strzVis.Label, Infinity, {}]
    },
    visualizationOrder:{
        play    :'loop',
        start   :'MATH'//starting index not counting down in first show
    }
});
contr.run();