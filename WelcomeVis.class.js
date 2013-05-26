/*
 * child of Visualization
 */
function WelcomeVis(stageWidth,maxHeight,txt){
var group;
var codeText;
var tween;
var tweenColor;
var anim;
var fow=true;
var stageWidth=stageWidth;
var maxHeight=maxHeight;
var txt=txt;
    this.start=function(){
        tween.play();
        tweenColor.play();
        anim.start();
        return this;
    };

    this.stop=function(){
        tween.reset();
        return this;
    };

    this.remove=function(){
        group.remove();
        return this;
    };
    this.destr=function(){
        tween.reset();
        tweenColor.reset();
        anim.stop();
        tween=null;
        tweenColor=null;
        anim=null;
    }
    this.init=function(){
        tween=new Kinetic.Tween({
            node:group,
            x:-stageWidth,
            easing: Kinetic.Easings['Linear'],
            duration:5
        });
        tweenColor=new Kinetic.Tween({
            node:codeText,
  //          fill:'red',
            easing: Kinetic.Easings['Linear'],
            duration:5
        });
        anim=new Kinetic.Animation(function(frame){
            if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)codeText.hide();
            else codeText.show();
            if(group.getX()<-(stageWidth-10)&&fow===true){
                tween.reverse();
                fow=false;
               
            }
            console.log(group.getX());
        },layer);
        return this;
    };

    this.get=function(){
        return group;
    };

    var create=function(){
        codeText=new Kinetic.Text({
            x:0,
            y:0,
            height:maxHeight,
            text: txt,
            fontSize:17,
            fontFamily:'Courier New',
            fill:'#02ff02'
        });
        group=new Kinetic.Group({
            x:stageWidth,
            y:20,
       /*     width:codeText.getWidht(),
            height:codetext.getHeight(),
            y:20,*/
            draggable:true,
        });
        group.add(codeText);
        return this;
    };
create();
}
