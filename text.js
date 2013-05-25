var stageWidth=480;
var stageHeight=540;
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

//binary
var inp=document.documentElement.innerHTML;
var out=Convert.toBinary(inp,5);

//first visualization
var codeText=new Kinetic.Text({
    x:0,
    y:20,
    height:consoleDisplay.getY(),
    text: out,
    fontSize:17,
    fontFamily:'Courier New',
    fill:'#02ff02'
});

codeText.setX(stage.getWidth());
layer.add(codeText);
var tween=new Kinetic.Tween({
    node:codeText,
    x:-codeText.getWidth(),
    easing: Kinetic.Easings['Linear'],
    duration:10
});
//first visualization is ready.
//first animantion
var codeTextA=new Kinetic.Text({
    x:0,
    y:20,
    height:consoleDisplay.getY(),
    text: out,
    fontSize:17,
    fontFamily:'Courier New',
    fill:'#02ff02'
});
layer.add(codeTextA);
var anim=new Kinetic.Animation(function(frame){
    if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)codeTextA.hide();
    else codeTextA.show();
},layer);
//first animation is ready.

/*
 * log order every sec
 */
var interv=self.setInterval(update,1000);
function update(){
    var ord=consoleDisplay.getOrder();
    console.log(ord);
    if(ord===1)tween.reverse();
    if(ord===2)tween.play();
    if(ord===3)anim.start();
    if(ord===4)document.getElementsByTagName('audio')[0].play();
    if(ord===5)document.getElementsByTagName('audio')[0].pause();
    
}