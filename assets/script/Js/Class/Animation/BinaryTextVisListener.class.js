/*
 * child of Visualization
 */
function BinaryTextVisListener(stageWidth,maxHeight){
var group;
var codeText;
var codeBgText;
var tween;
var tweenBg;
var anim;
var fow=true;//foward
var stageWidth=stageWidth;
var maxHeight=maxHeight;
var txt=Convert.toBinary(document.documentElement.innerHTML,5);
    this.isFinished=function(){
        return finished;
    }
    this.start=function(){
        tween.play();
        tweenBg.play();
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
        tweenBg.reset();
        anim.stop();
        tween=null;
        tweenBg=null;
        anim=null;
    }
    this.init=function(){
        tween=new Kinetic.Tween({
            node:group,
            x:-stageWidth,
            easing: Kinetic.Easings['Linear'],
            duration:5
        });
        tweenBg=new Kinetic.Tween({
            node:codeBgText,
            x:-stageWidth,
            easing: Kinetic.Easings['Linear'],
            duration:3
        });
        anim=new Kinetic.Animation(function(frame){
 //           console.log(group.getX());
            //if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)codeText.hide();
            //else codeText.show();
            if(group.getX()<-(stageWidth-10)&&fow===true){
                tween.reverse();
                tweenBg.reverse();
                fow=false;
                var gwidth=group.getWidth()*2;
                var gx=0;
                var gheight=maxHeight;
                var gy=0;
                for(var i=0;i<40;++i){
                    xPos=Math.floor((Math.random()*gwidth)+gx);
                    yPos=Math.floor((Math.random()*gheight)+gy);
                    var t=new Kinetic.Text({
                        x:xPos,
                        y:yPos,
                        text: txt.substr(i,i+4),
                        fontSize:12,
                        fontFamily:'Courier New',
                        fill:'#02ff02'
                    });
                    group.add(t);
                }
            }
            if(fow===false&&group.getX()+10>stageWidth){
                finished=true;              
            }
            
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
        codeBgText=new Kinetic.Text({
            x:0,
            y:0,
            height:maxHeight,
            text: txt,
            fontSize:17,
            fontFamily:'Courier New',
            fill:'#02ff02'
        });
        codeBgText.setX(codeText.getX()-1);
        group=new Kinetic.Group({
            x:stageWidth,
            y:20,
       /*     width:codeText.getWidht(),
            height:codetext.getHeight(),
            y:20,*/
            draggable:true,
        });
        group.add(codeText).add(codeBgText);
        return this;
    };
    var finished=false;
create();
}
