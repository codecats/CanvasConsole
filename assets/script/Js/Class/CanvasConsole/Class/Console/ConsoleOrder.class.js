(function() {
    /**
     * Manipulate with orders
     * 
     * @param Kinetic.Layer lay
     */
    strz_console.ConsoleOrder = function(lay) {
        var self = this;
        var __construct = function(layer) {

        };
        __construct(lay);
    };
    strz_console.ConsoleOrder.prototype = {
        /**
         *@private string _order holding current order
         */
        _order: null,
        
        /**
         * Sets the order
         * 
         * @param string val
         * @returns this
         */
        setOrder: function(val) {
            this._order = val;
            return this;
        },
        getOrder: function() {
            return this._order;
        },
        clearOrder: function() {
            this._order = 0;
            return this;
        }
    };
    strz_console.Extend(strz_console.ConsoleOrder, strz_console.ConsoleText);
})();
