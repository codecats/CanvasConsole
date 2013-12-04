var bug = {

       /*
         * Debuger use:
         * var p = new Person();
         * widget.d({me:p});
         * 
         * console.log(widget.me);
         * 
         * out:
         * 	[object]
         * 	[object]
         */
        d 	: function(obj, silence) {
                silence = (typeof(silence) === 'undefined') ? true : (!! silence);

                for(key in obj) {
                        if (key !== 'd') this[key] = obj[key];
                        else throw new Error('Trying eat myself');
                        if (silence === false) console.log(key, obj[key]);
                }
        },
        l 	: console.log
};