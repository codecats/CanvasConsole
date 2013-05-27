/*
 * before call for visualization destroy current one automaticly
 */
function VisualizationController(aLayer,width,height){
    this.start=function(order){
        if(!current){
            current=new Bin[Key[order]](stageW,stageH);
            layer.add(current.get());
            current.init();
            current.start();
            currentOrder=order;
        }       
    };
    this.finish=function(){
        if(current){
            current.destr();
            current.remove();
            current=null;
        }
    };
    var finish=this.finish;//public and private
    /*
     * add new visualization
     */
    this.add=function(visualization,order){
        var k=Bin.push(visualization);
        k--;
        Order[k]=order;
        Key[Order]=k;
        return this;
    };
    /*
     * destroy animation as the ordered
     */
    this.clear=function(order){
        var k=Key.pop(order);
        Order.pop(k);
        Bin.pop(k);
    };
    /*
     * 'cleaner' - timer check if visualization is finished, and if flag is set then
     * automaticly destroy current object
     */
    var intervalCleaner=function(){
        if(current){
            if(current.isFinished()){
                finish();
            }
        }
    };
    /*
     * check if order equals @param
     */
    this.isOrder=function(ord){
        var exist=false;
        for(var o in Order){
            if(Order[o]===ord)exist=true;
        }
        return exist;
    };
    var cleaner=setInterval(intervalCleaner,2000);
    var Bin=Array();
    var Key=Array();
    var Order=Array();
    var current=null;
    var currentOrder=null;
    var layer=aLayer;
    var stageW=width;
    var stageH=height;
}

