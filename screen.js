/**
 * Screen
 */


/**
 * goto_coord
 *      move the cursor to the given coord
 */
function setCursorCoords(_top, _left) {
    Terminal.top  = _top;
    Terminal.left = _left;
};

function getCursorCoords() {
    return {top: Terminal.top, left: Terminal.left};
};

/**
 * write
 *      write text to where the cursor is
 *      either inserts or replaces texted depending on overwrite value
 */
function write (str, overwrite) {
    if(overwrite){
        ;
    } else {
        ;
    }
};

var Terminal = {
    buffer: "",
    top: 0,
    left: 0,
    history: 0,
    historyPos: 0,
    promptActive: true,
    _cursorBlinkTimeout: null,
    config: {
        cursor_blink_time: 500
    },


    
    init: function() {
        this.setCursorState();
    },
    
    setCursorState: function() {
        // toggle cursor
        $("#cursor").toggleClass("on").toggleClass("off");

        // blink cursor
        this._cursorBlinkTimeout = window.setTimeout($.proxy(function(){
            this.setCursorState(!this.cursorBlinkState,true)
        }, this), this.config.cursor_blink_time);
        
    }
};

$(function(){ // on load
    Terminal.init();
});
