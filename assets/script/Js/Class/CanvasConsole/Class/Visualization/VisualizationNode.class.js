(function(){
    strz_console.VisualizationNode=function(){};
    strz_console.VisualizationNode.prototype={
        
        group : null,
        stageWidth : null,
        maxHeight : null,
        finishedListener : null,
        setFinishedListener : function(listener) {
            this.finishedListener = listener;
            return this;
        },
        /**
         * When visualization finished own life cycle then should invoke 
         * callFinished.
         * It is closure because Animation content is in difference scope.
         * 
         * @returns closure
         */
        callFinished : function() {
            return function(){
                self.finishedListener['object'][self.finishedListener['call']]();
            };
        },
        setLayer : function (layer) {
            this._set('layer', layer);
        },
        getLayer : function() {
            return this._get('layer');
        },
        /**
         * Initialize data
         * 
         * @returns this
         */
        init : function() {
            alert('overload init');
        },
        /*
         * start kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        start:function() {
            alert('visualization started');
            return this;
        },
        /*
         * stop kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        stop:function(){
            alert('visualization stopped');
            return this;
        },
        /*
         * removes Kinetic.group from layer
         * @returns {Visualization}
         */
        remove:function(){
            alert('removed from layer');
            return this;
        },
        /*
         * create all tweens and animation after add objects to layer 
         * (KineticJS condition)
         * @returns {Visualization}
         */
        initMove:function(){
            return this;
        },
        /*
         * destroy all tweens and animation
         * @returns {Visualization}
         */
        destr:function(){
            return this;
        },
        /*
         * 
         * @returns {unresolved}
         */
        get:function(){
            alert('overload VisualizationNode main mehods');
            return null;
        },
        /*
         * private function, create the group with objects
         * @return Kinetic.Group
         */
        create:function(){
            return this;
        }
    };
    strz_console.Extend(strz_console.VisualizationNode, strz_console.Node);
})();

