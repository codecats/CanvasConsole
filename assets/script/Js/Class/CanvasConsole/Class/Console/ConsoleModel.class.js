(function() {
    /**
     * 
     * @param Kinetic.Layer lay
     * @returns ConsoleModel
     */
    strz_console.ConsoleModel = function(lay) {
    };
    /**
     * Extendable
     */
    strz_console.ConsoleModel.prototype = {
        /**
         * @private object listener, should point to object instance which 
         * listen to events and method to be called.
         * 
         *  {
         *      object : instance
         *      call   : function
         *  }
         */
        listener: null,
        /**
         * Sets listener
         * 
         * @param object list
         * @returns this
         */
        setOrderListener: function(list) {
            this.listener = list;
            return this;
        },
        getOrderListener: function() {
            return this.listener;
        },
        /**
         * Caret shape on canvas
         */
        caret: Kinetic.Rect,
        /**
         * Returns parameters for caret shape default caret in on the bottom
         * of canvas so paramY is canvas height
         * 
         * @returns params
         */
        getCaretParams: function() {
            var paramY = this._get('stageHeight');
            return {
                x: 5,
                y: paramY - 40,
                width: 15,
                height: 30,
                draggable: false,
                opacity: 0.9,
                fill: '#02ff02'
            };
        },
        /**
         * Caret animation property
         */
        animCaret: Kinetic.Animation,
        /**
         * Default animations is blinking. Speed for that can be change:
         * 
         * Math.sin(frame.time * const * Math.PI / divi)
         * 
         * frame.time it is time form the frame so change is impossible, but
         * recomended way to change speed is manipulate with 'div' variable.
         * To increase speed of blinking lower the divi. To set diffrent speed
         * we can use this proportion:
         * divi - time[s]
         * 1000 - 1
         * 
         * So time = divi/1000 [s].
         */
        initAnimCaret: function() {
            var caret = this.caret;
            var layer = this._get('layer');
            this.animCaret = new this.animCaret(function(frame) {
                if (Math.sin(frame.time * 2 * Math.PI / 2000) > 0.6)
                    caret.hide();
                else
                    caret.show();
            }, layer);
            this.animCaret.start();
        },
        initCaret: function() {
            this.caret = new this.caret(this.getCaretParams());
        },
        /**
         * Represents the text typing by user
         */
        commandText: Kinetic.Text,
        getCommandTextParams: function() {
            return{
                x: this.caret.getX(),
                y: this.caret.getY(),
                fontSize: this.caret.getHeight(),
                text: '',
                fontFamily: 'Courier New',
                fill: '#02ff02'
            };
        },
        initCommandText: function() {
            this.commandText = new this.commandText(this.getCommandTextParams());
        },
        /**
         * Main part of Model, caret and command bar is in one group. It gives 
         * better way to manipulation
         */
        group: Kinetic.Group,
        initGroup: function() {
            this.group = new this.group();
            this.group.add(this.caret).add(this.commandText);
            this.initAnimCaret();
        },
        getGroup: function() {
            return this.group;
        },
        getY: function() {
            return this.caret.getY() - this.caret.getHeight();
        }
    };
    strz_console.Extend(strz_console.ConsoleModel, strz_console.ConsoleOrder);
})();
