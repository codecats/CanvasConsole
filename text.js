var stageWidth=480;
var stageHeight=540;
var stage=new Kinetic.Stage({
                width:stageWidth,
                height:stageHeight,
                container:'container'
            });
var layer=new Kinetic.Layer();
var codeText=new Kinetic.Text({
    x:0,
    y:20,
    text: document.documentElement.innerHTML,
    fontSize:7,
    fontFamily:'Courier New',
    fill:'#02ff02'
});



codeText.setX(codeText.getWidth());
stage.add(layer.add(codeText));


var cons=new Console(stageHeight,document.getElementsByTagName('canvas')[0]);
stage.add(cons.getLayer());

var tween=new Kinetic.Tween({
    node:codeText,
    x:-codeText.getWidth(),
    easing: Kinetic.Easings['Linear'],
    duration:10
});
tween.play();