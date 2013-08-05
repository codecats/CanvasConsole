/*
 * needs layer, width, height
 */
(function(){
    strz_console.VisualizationContainer=function(obj){
    /*    var self=this;
        var __construct=function(obj){
            this._initAttrs(obj);
        };
        __construct(obj);*/
    };
    strz_console.VisualizationContainer.prototype={
        getLayer:function(){
            return this._get('layer');
        },
        bin:[],//all declarations of Visualizations
        key:[],//
        order:[],//all order array
        countToPlay:[],//counter down: show how many Visualization have to be shown
        arguments:[],//arguments for each Visulalizations
        current:null,//Visualization instance
        currentOrder:null,//order to do in next time interval
        playMode:'once',//once, loop      
    };
    strz_console.Extend(strz_console.VisualizationContainer, strz_console.Node);
})();
