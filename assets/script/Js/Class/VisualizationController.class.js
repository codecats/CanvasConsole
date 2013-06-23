/*
 * before call for visualization destroy current one automaticly
 */
function VisualizationController(aLayer,width,height){
    this.start=function(order){
        if(!current){
            console.log(Bin);
            current=new Bin[Key[order]](stageW,stageH);
            layer.add(current.get());
            current.init();
            current.start();
            currentOrder=order;
        }       
    };
    var start=this.start;//public and private
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
        Key[order]=k;
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
        }else if(playMode==='loop'){
            if(currentOrder){
                k=getFirstFreeKey(Key[currentOrder]);
                start(Order[k]);
            }
        }
    };
    this.setPlayMode=function(m){
        playMode=m;
    };
    /*
     * check if order equals @param
     * @param {type} ord
     * @returns {Boolean}
     */
    this.isOrder=function(ord){
        var exist=false;
        for(var o in Order){
            if(Order[o]===ord)exist=true;
        }
        return exist;
    };
    /*
     * looks for the next key in array Key
     * example: Key=array(3,4,5,6,7), keyBefore=5 => result=6
     * 
     */
    var getFirstFreeKey=function(keyBefore){
        var getNext=false;
        var found=null;
        for(k in Key){
            if(getNext){
                found=Key[k];
                getNext=false;
            }
            if(keyBefore===Key[k])getNext=true;   
        }
        if(found===null)found=Key[Order[0]];
        return found;
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
    var playMode='once';
}

