/*
 * needs layer, width, height
 */
(function(){
    strz_console.VisualizationController=function(obj){
        var self=this;
        var __construct=function(obj){
            self._initAttrs(obj);
            self.initCleanerListener();
        };
        __construct(obj);
    };
    strz_console.VisualizationController.prototype={
    /*
     * add new visualization
     */
        add:function(visualization, order, playTimes){
            var k=this.bin.push(visualization);
            k--;
            this.order[k]=order;
            this.countToPlay[k]=playTimes;
            this.key[order]=k;
            return this;
        },
        start:function(order){
            if(!this.current){
                try{
                    this.current=new this.bin[this.key[order]](
                            this.getWidth(), this.getHeight());
                    this.getLayer().add(this.current.get());
                    this.current.init();
                    this.current.start();
                    this.currentOrder=order;
                }catch(err){      
                    if(this.order.length>0){
                        for(ord in this.order)this.clear(this.order[ord]);
                        console.log('Nothing to play: cleaning up...');
                    }   
                }
            }
        },
        setPlayMode:function(mode){
            this.playMode=mode;
        },
    /*
     * check if order equals @param
     * @param {type} ord
     * @returns {Boolean}
     */
        isOrder:function(ord){
            var exist=false;
            for(var o in this.order){
                if(this.order[o]===ord)exist=true;
            }
            return exist;
        },
    /*
     * looks for the next key in array Key
     * example: Key=array(3,4,5,6,7), keyBefore=5 => result=6
     * 
     */
        getFirstFreeKey:function(keyBefore){
            var getNext=false;
            var found=null;
            for(k in this.key){
                if(getNext){
                    if(this.countToPlay[this.key[k]]>0){
                        if(this.countToPlay[this.key[k]]!==Infinity){
                            this.countToPlay[this.key[k]]--;
                        }
                        found=this.key[k];
                        getNext=false;
                    }
                }
                if(keyBefore===this.key[k]){
                    getNext=true;
                }
            }
            
             //if nothing fount search from beginning
             
            if(found===null){
                for(k in this.key){
                    if(this.countToPlay[this.key[k]]>0){
                        if(this.countToPlay[this.key[k]]!==Infinity){
                            this.countToPlay[this.key[k]]--;
                        }
                        found=this.key[k];
                    }
                }
                
            }
            return found;
        },
        finish:function(){
            if(this.current){
                this.current.destr();
                this.current.remove();
                this.current=null;
            }
        },
    /*
     * destroy animation as the ordered
     */
        clear:function(order){
            var k=this.key.pop(order);
            this.order.pop(k);
            this.countToPlay.pop(k);
            this.bin.pop(k);
        },
    /*
     * 'cleaner' - timer check if visualization is finished, and if flag is set then
     * automaticly destroy current object
     */
        cleanerListener:null,
        intervalCleaner:function(){
            var controller=this;
            return function(){
                if(controller.current){
                    if(controller.current.isFinished()){
                        controller.finish();
                    }
                }else if(controller.playMode==='loop'){
                    if(controller.currentOrder){
                        var k=controller.getFirstFreeKey(controller.key[controller.currentOrder]);
                        controller.start(controller.order[k]);
                    }
                }
            };
        },
        initCleanerListener:function(){
            this.cleanerListener=window.setInterval(this.intervalCleaner(), 2000);
        }
    };
    strz_console.Extend(
            strz_console.VisualizationController, strz_console.VisualizationContainer);
})();