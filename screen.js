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

now = {} //debug

/**
 * Parse for ANSI escape codes and react accordingly.
 */
now.stdout = function (str) {
    escape_code = /\x1b\[(?:\d;)*\d?[A-Za-z]/g;
    non_escaped = str.split(escape_code);
    escaped = str.match(escape_code);
    if (!escaped) {
        escaped = {};
    }
    for (i=0; i < escaped.length; i++) {
           write(non_escaped[i],false);
           handle_escaped_string(escaped[i]);
    }
    write(non_escaped[escaped.length],false);
}

function handle_escaped_string(escaped_str) {
    numerical_args = escaped_str.slice(2,-1)
    letter_code = escaped_str[escaped_str.length-1]
}

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
