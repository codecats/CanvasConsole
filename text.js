var stageWidth=320;
var stageHeight=440;
var stage=new Kinetic.Stage({
                width:stageWidth,
                height:stageHeight,
                container:'container'
            });
var layer=new Kinetic.Layer();
stage.add(layer);
var consoleDisplay=new Console(document.getElementsByTagName('canvas')[0],layer);
layer.add(consoleDisplay.getGroup());
//Console is ready.

var visController=new VisualizationController(layer,stageWidth,consoleDisplay.getY());
visController.add(WelcomeVis,'V');
visController.add(BinaryTextVis,'B');
visController.add(MathVis,'A');
visController.setPlayMode('loop');
visController.start('A',layer);
/*
 * log order every sec
 */
var interv=self.setInterval(update,1000);
function update(){
    var ord=consoleDisplay.getOrder();
    if(ord==='STOP'){
        visController.finish();
    }
    if(visController.isOrder(ord))visController.start(ord,layer);
    if(ord==='LOOP')visController.setPlayMode('loop');
    if(ord==='ONCE')visController.setPlayMode('once');
    consoleDisplay.clearOrder();
}