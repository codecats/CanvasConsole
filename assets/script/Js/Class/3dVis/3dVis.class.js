/*
 * child of Visualization
 */
function MathVis(stageWidth,maxHeight){
var group;
var codeText;
var img=Array();
var imageUrl=Array();
var imageSrcs=Array();
var imageCounts=Array();
var tweensArray=Array();
var imgIntegral;
var imgDerivative;
var integral;
var tween;
var tweensObj=Array();
var anim;
var stageWidth=stageWidth;
var maxHeight=maxHeight;
var doStart=false;//if image loads mark this flag

    this.isFinished=function(){
        return finished;
    }
    this.start=function(){
       /* for(var t in tweensObj){
            tweensObj[t].play();
        }*/
        for(var key in tweensArray){
            tweenObj=tweensArray[key];
            for(var t in tweenObj){
                tweensArray[key][t].play();
            }
        }
        doStart=true;
        return this;
    };
    var start=this.start;
    this.stop=function(){
        for(var t in tweensObj){
            tweensObj[t].pause();
        }
        return this;
    };

    this.remove=function(){
        group.remove();
        return this;
    };
    this.destr=function(){
        tween.reset();
        anim.stop();
        tween=null;
        anim=null;
    }
    this.init=function(){
        tween=new Kinetic.Tween({
            node:group,
            x:-stageWidth,
            easing: Kinetic.Easings['Linear'],
            duration:5
        });
        anim=new Kinetic.Animation(function(frame){
 //           console.log(group.getX());
            //if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)codeText.hide();
            //else codeText.show();
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
        
        group=new Kinetic.Group({
            x:stageWidth*2,
            y:20,
       /*     width:codeText.getWidht(),
            height:codetext.getHeight(),
            y:20,*/
            draggable:false,
        });

        setImages('./MathVis/integral.png',5);
        setImages('./MathVis/derivative.png',3);
        setImages('./MathVis/equation.png',6);
        setImages('./MathVis/arcsin.png',4);
     
       for(var src in imageSrcs){
            imageUrl[src]=new Image();
            imageUrl[src].src=imageSrcs[src];//imageUrl=http://localhost/ <> imageSrcs=./
            imageSrcs[src]=imageUrl[src].src;//imageUrl=http://localhost/ === imageSrcs=imageUrl=http://localhost/
            imageUrl[src].onload=function(){
                var allLoaded=true;
                for(var src in imageUrl){//check all urls is complete true
                    if(!imageUrl[src].complete)allLoaded=false;
                    
                }
                if(allLoaded){//if all imgs loaded create objects and tweens
                    for(var key in imageUrl){
                        for(var i=0;i<imageCounts[key];++i){
                            var o=objFromImg(imageUrl[key]);
                            o=setRandPos(o);
                            group.add(o);
                            var tw=randTween(o);
                            if(tweensArray[key])tweensArray[key].push(tw);
                            else{
                                tweensArray[key]=Array();
                                tweensArray[key].push(tw);
                            }
                        }
                    }
                    if(doStart){
                        start();
                        doStart=false;
                    }
                }
            }
        }
        
     /*   imgIntegral=new Image();
        imgIntegral.src='./MathVis/integral.png';
        imgDerivative=new Image();
        imgDerivative.src='./MathVis/derivative.png';
        integral=new Kinetic.Image({      
            image:imgIntegral
        });
        integral=new Kinetic.Image({      
            image:imgDerivative
        });
        //integrals
        imgIntegral.onload=function(){
            imgIntegral.loaded=true;
            for(var i=0;i<6;++i){
                var o=objFromImg(imgIntegral);
                o=setRandPos(o);
                group.add(o);
                var tw=randTween(o);
                tweensObj.push(tw);
            }
            if(doStart&&imgDerivative.loaded){
                start();
                doStart=false;
            }
            
        }
        imgDerivative.onload=function(){
            imgDerivative.loaded=true
            for(var i=0;i<6;++i){
                var o=objFromImg(imgDerivative);
                o=setRandPos(o);
                group.add(o);
                var tw=randTween(o);
                tweensObj.push(tw);
            }
            if(doStart&&imgIntegral.loaded){
                start();
                doStart=false;
            }
            
        }*/
        return this;
    };
    var setImages=function(url, count){
        var k=imageSrcs.push(url);
        imageCounts[--k]=count;
        return this;
    }
    var setRandPos=function(obj){
        var xRand=(Math.random()*stageWidth)+0;
        var yRand=(Math.random()*maxHeight)+0;
        var rot=(Math.random()*1)+0;
        var positive=1;
        if(rot<0.5)positive=-1;
        var scale=1-rot*0.5;
        obj.setX(xRand);
        obj.setY(yRand-obj.getHeight());
        obj.rotate(Math.PI/8*rot*positive);
        obj.setScale(scale);
        return obj;
    };
    var objFromImg=function(imag){
        var obj=new Kinetic.Image({      
            image:imag,
            draggable:true
        });
        return obj;
    }
    var randTween=function(node){
        t=new Kinetic.Tween({
            node:node,
            x:-(stageWidth+node.getX())*2,
            easing: Kinetic.Easings['Linear'],
            duration:10,
            onFinish:function(){
                finished=true;   
            }
        });
        return t;
    }
    var finished=false;
create();
}
