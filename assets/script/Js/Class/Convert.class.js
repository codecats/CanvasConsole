/*
 * static converter
 */
var Convert={
    toBinary : function(inp, cols){
        cols=cols||8;
        var out='';
        for (i=0; i < inp.length; i++) {
            if(i%cols)out+='';
            else out+='\n';
            out+=inp[i].charCodeAt(0).toString(2) + " ";
            
        }
        return out;
    }
}

