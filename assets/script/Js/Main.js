var contr = new strz_console.CanvasController({
    width           : 320,
    height          : 440,
    baseDir         : 'assets/script/Js',
    visualizations  :{
        //command : [class, count, args]

        'MATH'  : [strzVis.Math,    0,          {}],//0 because start anim
        'CODE'  : [strzVis.Code,    1,          {}],
       // 'TECH'  : [strzVis.Tech,    Infinity,   {}],
        'CATS'  : [strzVis.Label,   Infinity,   {}]
    },
    visualizationOrder:{
        play    :'loop',
        start   :'MATH'//starting index not counting down in first show
    }
});
contr.run();