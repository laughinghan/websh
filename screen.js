/**
 * Screen
 */


var cleanLine = '<p><span id="cursor" class="on">&nbsp;</span></p>'; 

function setBackgroundColor(rgb) {
    $("body").css('background-color',rgb); 
    $("#cursor.on").css('color',rgb); 
    $("#cursor.off").css('background-color',rgb);
}

function setForegroundColor(rgb) {
    $("body").css('color',rgb);
    $("#cursor.on").css('background-color',rgb);
    $("#cursor.off").css('color',rgb);
}

/**
 * goto_coord
 *      move the cursor to the given coord
 */
function setCursorCoords(_top, _left) {
    line = $("#display p :eq("+ _top + ")");


    Terminal.top  = _top;
    Terminal.left = _left;
};

function getCursorCoords() {
    return {top: Terminal.top, left: Terminal.left};
};

/**
 * Clear all characters on screen.
 */
function clearScreen() {
   $("#display").children().remove();
   $("#display").append(cleanLine);
};
/**
 * Clear all characters from the current cursor
 * to the end of the current line, including
 * the current cursor.
 */
function clearLine() {
    $("#cursor").parent().replaceWith(cleanLine);
};

/**
 * setGraphicsMode
 * for each numerical argument, perform the corresponding
 * graphics operation.
 */
textAttributes = {'bold':false,'underscore':false,'blink':false,'reverseVideo':false,'concealed':false}
 
function setGraphicsMode(numericalArgs) {
    for (arg in numericalArgs) {
        switch (arg) {
            //text attributes
            case 0:
                for (attribute in textAttributes) {
                    textAttributes[attribute] = false;
                }
                break;
            case 1:
                textAttributes.bold = true;
                break;
            case 4:
                textAttributes.underscore = true;
                break;
            case 5:
                textAttributes.blink = true;
                break;
            case 7:
                textAttributes.reverseVideo = true;
                break;
            case 8:
                textAttributes.concealed = true;
                break;
            //foreground colors
            case 30:
                setForegroundColor('black');
                break;
            case 31:
                setForegroundColor('red');
                break;
            case 32:
                setForegroundColor('green');
                break;
            case 33:
                setForegroundColor('yellow');
                break;
            case 34:
                setForegroundColor('blue');
                break;
            case 35:
                setForegroundColor('magenta');
                break;
            case 36:
                setForegroundColor('cyan');
                break;
            case 37:
                setForegroundColor('white');
                break;
            //background colors
            case 40:
                setBackgroundColor('black');
                break;
            case 41:
                setBackgroundColor('red');
                break;
            case 42:
                setBackgroundColor('green');
                break;
            case 43:
                setBackgroundColor('yellow');
                break;
            case 44:
                setBackgroundColor('blue');
                break;
            case 45:
                setBackgroundColor('magenta');
                break;
            case 46:
                setBackgroundColor('cyan');
                break;
            case 47:
                setBackgroundColor('white');
                break;            
        }
    }
}

/**
 * setForegroundColor
 * set the text color to color
 */
 
function setForegroundColor(color) {
    
}

/**
 * setBackgroundColor
 * set the background color to color
 */
 
 function setBackgroundColor(color) {
     
 }

/**
 * write
 *      write text to where the cursor is
 *      either inserts or replaces texted depending on overwrite value
 */

function write(str, overwrite) {
    str.split('\n')
        .forEach(function(s){
            write_line(s, overwrite);
        });
}

function write_line(str, overwrite) {
    if(!overwrite || (Terminal.left == $("#cursor").parent().text().length() - 1)) {
        $("#cursor").before(str);
    } else { // must overwrite
        $("#cursor").before(str);
    }
}

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
           handleEscapedString(escaped[i]);
    }
    write(non_escaped[escaped.length],false);
}

savedCoords = null;

/**
 * Parse an escape sequence, call the appropriate
 * semantic actions
 */
function handleEscapedString(escapedStr) {
    numericalArgs = escapedStr.slice(2,-1).split(";").map(parseInt);
    letterCode = escapedStr[escapedStr.length-1];
    currentCoords = getCursorCoords();
    currentTop = currentCoords[top]; currentLeft = currentCoords[left];
    switch(letter_code) {
    //move to specified position
    case 'H':
    case 'f':
        setCursorCoords(numericalArgs[0],numericalArgs[1]);
        break;
    //move up so many rows
    case 'A':
        setCursorCoords(currentTop - numericalArgs[0],currentLeft);
        break;
    //move down so many rows
    case 'B':
        setCursorCoords(currentTop + numericalArgs[0],currentLeft);
        break;
    //move left so many rows
    case 'C':
        setCursorCoords(currentTop,currentLeft - numericalArgs[0]);
        break;
    //move right so many rows
    case 'D':
        setCursorCoords(currentTop,currentLeft + numericalArgs[0]);
        break;
    case 's':
        savedCoords = currentCoords;
        break;
    case 'u':
        setCursorCoords(savedCoords[top],savedCoords[left]);
        break;
    case 'J':
        clearScreen();
        setCursorCoords(0,0);
        break;
    case 'K':
        clearLine();
        break;
    case 'm':
        setGraphicsMode(numericalArgs);
        break;
    //TODO Set Mode, Reset Mode, Set Keyboard Strings
    }
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
        // cursor
        this.setCursorState();
    },
    
    setCursorState: function() {
        // cursor
        this.top  = $("#display p").index($("#cursor").parent());
        this.left = $("#cursor").parent().text().indexOf($("#cursor").text());

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
