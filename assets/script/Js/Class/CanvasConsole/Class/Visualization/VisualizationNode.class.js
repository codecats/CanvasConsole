(function(){
    strz_console.VisualizationNode=function(){};
    strz_console.VisualizationNode.prototype={
        /*
         * if visualization is end finished flag is set
         * @returns fished
         */
        isFinished:function(){
            return this.finished;
        },
        /*
         * start kinetic.animation or/and kinetic.tween
         * @returns {Visualization}
         */
        start:function(){
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
        init:function(){
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
            alert('get');
            return null;
        },
        /*
         * private function, create the group with objects
         * @return Kinetic.Group
         */
        create:function(){
            return this;
        },
        finished:false
    };
    strz_console.Extend(strz_console.VisualizationNode, strz_console.Node);
})();

