(function() {
    /**
     * 
     * @param Kinetic.Layer lay
     * @param object listener
     * @returns Console
     */
    strz_console.Console = function(lay, listener) {
        var self = this;
        var __construct = function(layer, listener) {

            self.initObjects(layer, listener);
        };
        __construct(lay, listener);
    };
    strz_console.Console.prototype = {
        /**
         * 
         * @param Event e
         * @returns this
         */
        handleKeyDown: function(e) {
            var commandText = this.commandText;
            var canvas = this._get('canvas');
            var caret = this.caret;
            var layer = this._get('layer');
            var listener = this.getOrderListener();
            var cleanOrder = this.clearOrder;
            var orderer = this;

            var keyCodeToChar = this.keyCodeToChar;
            return function(e) {
                //put to command char (48 - 90) - chars
                if ((e.keyCode) < 91 && (e.keyCode > 47)) {

                /**
                 * check command width limit and append char converted by keyCodes to chars
                 */
                if ( ! ((commandText.getWidth() + caret.getWidth() * 2) >= canvas.width))
                    commandText.setText(commandText.getText() + keyCodeToChar[e.which || e.keyCode]);
                } else {
                    switch (e.keyCode) {
                        case 8://delete
                            var txt = commandText.getText();
                            commandText.setText(txt.substr(0, txt.length - 1));
                            break;
                        case 32://space

                            //check command width limit
                            if (!((commandText.getWidth() + caret.getWidth() * 2) >= canvas.width))
                                commandText.setText(commandText.getText() + ' ');
                            break;
                            /**
                             * Approve command
                             */
                        case 13://enter
                            var t = commandText.getText();
                            orderer.setOrder(t);
                            //clear the bar
                            commandText.setText('');
                            //tell about event to the listener
                            listener['object'][listener['call']]();
                            //clean order after call
                            cleanOrder();
                            break;
                    }
                }
                /**
                 * Put carret in the right position
                 */
                caret.setX(commandText.getX() + commandText.getWidth());
                caret.setY(commandText.getY() - caret.getHeight() * 0.1);
                layer.draw();
                return this;
            };
        },
        initTyping: function() {
            var canvas = this._get('canvas');
            //Canvas now holds keyborad events like <input> type
            canvas.setAttribute('tabindex', '0');
            canvas.focus();
            canvas.addEventListener('keydown', this.handleKeyDown(), false);
        },
        initObjects: function(layer, listener) {
            var canv = layer.getCanvas().getElement();
            this._initAttrs({
                layer: layer,
                canvas: canv,
                stageHeight: canv.height
            });

            this.initCaret();
            this.initCommandText();
            this.initGroup();
            /**
             * Listen the keyboard
             */
            this.addWindowEventListener();
            /**
             * Set OrderListener before initTyping, the reason is that
             * initTyping method calls handleKeyDown method, so the state
             * of the listener is null when handleKeyDown calls
             */
            this.setOrderListener(listener);
            this.initTyping();
        }
    };
    strz_console.Extend(strz_console.Console, strz_console.ConsoleModel);
})();
