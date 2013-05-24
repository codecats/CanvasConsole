/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 var stageWidth=480;
            var stageHeight=640;
            var imgsrc="baner.jpg";
            var backgroundImg=new Image();
            backgroundImg.src=imgsrc;
            var bg=new Kinetic.Image({
                    x:0,
                    y:0,
                    image:backgroundImg,
                    width:stageWidth,
                    height:stageHeight
                });
            
            var stage=new Kinetic.Stage({
                width:stageWidth,
                height:stageHeight,
                container:'container'
            });
            var layer=new Kinetic.Layer();
           // layer.add(bg);
            var mainTitleText=new Kinetic.Text({
                x:stage.getWidth()*0.1,//10 precents
                y:stage.getHeight()/3-40/2,
                text:'CodeCats.eu',
                fontSize:40,
                fontFamily: 'Calibri',
                fontStyle: 'bold',
                fill:'red',
                width:stage.getWidth()*0.8,
                stroke:'black',
                shadowColor:'black',
                shadowBlur:10,
                shadowOffset:[2,2],
                strokeWidth:1,
                align:'center'
            });
            var additionalInfo=new Kinetic.Group({
                x:10,
                y:10,
                draggable:true,
                clipFunc:function(canvas){
                  //  var context = canvas.getContext();
                  //  context.rect(20, 10, 200, 200);
                }
            });
            
            var rectangle=new Kinetic.Rect({
                x:0,
                y:0,
                width:100,
                height:30,
                fill:'black'
            });
         //   additionalInfo.add(rectangle);
            layer.add(additionalInfo.add(rectangle));
     
            var blobsCount=10;
            for(i=0;i<blobsCount;++i){
                var posX=Math.random() * (stage.getWidth() - 0) + 0;//(max-min)+min
                var posY=Math.random() * (stage.getHeight() - 0) + 0;
                var r=Math.random() * (40 - 5) + 5;
                var offsetColor=100;
                var step=(255-offsetColor)/(blobsCount);
                var fillColor='rgb('+(Math.round(offsetColor+step*i))+',92,249)';
                var posit=1;
                if(i%2)posit=-1;
                    console.log(fillColor);
                var c=new Kinetic.Circle({
                    radius:r,
                    fillRadialGradientStartPoint: 20,
                    fillRadialGradientStartRadius: 0,
                    fillRadialGradientEndPoint:0,
                    fillRadialGradientEndRadius: r,
                    fillRadialGradientColorStops: [0, 'yellow', 0.2, 'yellow', 0.8, fillColor, 1, fillColor],
                    stroke:'black',
                    strokeWidth:4,
                 //   shadowColor:'white',
                 //   shadowBlur:6,
                    opacity:0.2
                });
                var circle=new Kinetic.Group({
                    x:posX,
                    y:posY,
                    name:'circle',
                    draggable:true
                });
                circle.add(c);
          
                circle.speedX=Math.random()*(.2-.1)+.1*posit;
                circle.speedY=circle.speedX;
                layer.add(circle);
            }
            stage.add(layer.add(mainTitleText));
            
            //animations

            var amplitudeVertical=stage.getWidth()/2;
            var amplitudeHorizontal=stage.getHeight()/2;
            var anim=new Kinetic.Animation(function(frame){
                console.log(frame);
                circles=layer.get('.circle');
                circles.each(function(c){
                    nowX=c.getX();
                    nowY=c.getY();
                    speedXPositive=Math.random()*(.2-.1)+.1;
                    speedYPositive=Math.random()*(.2-.1)+.1;
                    if(nowX>stageWidth)c.speedX=speedXPositive*-1;
                    else if(nowX<0)c.speedX=speedXPositive;
                    c.setX(c.speedX+c.getX());
                    if(nowY>stageHeight)c.speedY=speedYPositive*-1;
                    else if(nowY<0)c.speedY=speedYPositive;
                    c.setY(c.speedY+c.getY());
                });
            },layer);
            anim.start();
