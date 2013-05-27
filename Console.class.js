/*
 * 
 * @param {type} canv
 * @param {type} lay
 * @returns {Console}
 * set window to disable space and arrow keys for browser
 * canvas needed for enable keydown listener and set caret posiotion
 * caret is a blinking rectangle and command line is text, from this elements
 *  the group is maked, after that in render program this group should be add
 *  to layer
 * order is int number
 */
function Console(canv,lay){
    this.getY=function(){
        return caret.getY()-caret.getHeight();
    };
    this.getGroup=function(){
        return g;
    };
    this.getOrder=function(){
        return order;
    };
    this.clearOrder=function(){
        order=0;
        return this;
    }
    /* 
     * turn off browser events like page down
     */
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([8, 32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
    var canvas=canv;
    var layer=lay;
    var stageHeight=canvas.height;

    /*
     * display variables
     * @type @exp;Kinetic@call;Rect
     */
    var caret=new Kinetic.Rect({
        x:5,
        y:stageHeight-40,
        width:15,
        height:30,
        draggable:false,
        fill:'#02ff02'
    });
    var commandText=new Kinetic.Text({
        x:caret.getX(),
        y:caret.getY(),
        fontSize:caret.getHeight(),
        text:'',
        fontFamily:'Courier New',
        fill:'#02ff02'
    });
    var commandBG=new Kinetic.Rect({//not used
        x:0,
        y:caret.getY()-5,
        width:canvas.width,
        height:caret.getHeight()+5,
        draggable:false,
        fill:'black'
    });
    var g= new Kinetic.Group();

    /*
     * type variable
     */
    var keyCodeToChar = {8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};
    var keyCharToCode = {"Backspace":8,"Tab":9,"Enter":13,"Shift":16,"Ctrl":17,"Alt":18,"Pause/Break":19,"Caps Lock":20,"Esc":27,"Space":32,"Page Up":33,"Page Down":34,"End":35,"Home":36,"Left":37,"Up":38,"Right":39,"Down":40,"Insert":45,"Delete":46,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"Windows":91,"Right Click":93,"Numpad 0":96,"Numpad 1":97,"Numpad 2":98,"Numpad 3":99,"Numpad 4":100,"Numpad 5":101,"Numpad 6":102,"Numpad 7":103,"Numpad 8":104,"Numpad 9":105,"Numpad *":106,"Numpad +":107,"Numpad -":109,"Numpad .":110,"Numpad /":111,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123,"Num Lock":144,"Scroll Lock":145,"My Computer":182,"My Calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222};
    var animCaret=new Kinetic.Animation(function(frame){
        if(Math.sin(frame.time*2*Math.PI/1000)<-0.6)caret.hide();
        else caret.show();
    },layer);
    var handlekeydown=function(e){
        //put to command char (48 - 90) - chars
        if((e.keyCode)<91 && (e.keyCode>47)){

            //check command width limit
            if(!((commandText.getWidth()+caret.getWidth()*2)>=canvas.width))
                commandText.setText(commandText.getText()+keyCodeToChar[e.which || e.keyCode]);
        }else{
            switch(e.keyCode){
                case 8://delete
                    var txt=commandText.getText();
                    commandText.setText(txt.substr(0,txt.length-1));
                    break;
                case 32://space

            //check command width limit
                    if(!((commandText.getWidth()+caret.getWidth()*2)>=canvas.width))
                    commandText.setText(commandText.getText()+' ');
                    break;
                case 13://enter
                    var t=commandText.getText();
               /*     for(var ord in ORDERS){   
                        if(t===ORDERS[ord]){
                            order=parseInt(ord);
                        }
                    }*/
                    order=t;    
                    commandText.setText('');
                    break;
            }
        }
        caret.setX(commandText.getX()+commandText.getWidth());
        caret.setY(commandText.getY()-caret.getHeight()*0.1);
        layer.draw();
        return false;
    };
    /*
     * Order to show (numeric 1, 3 , 4 ext
     */
    var order=0;

    g.add(caret).add(commandText);
    /*
     * caret animations
     */

    animCaret.start();
    /* Console commands*/

    /*
     * type on the canvas - get keys listener active
     */
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    canvas.addEventListener('keydown',handlekeydown,false);


}


