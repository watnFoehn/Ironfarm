
function DisableScrollbars()
{
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

/* ----------------------------------------------------------------------------------------
|
|    The constructor-class for the maze 
|
\-----------------------------------------------------------------------------------------*/
function Game(maze, level) {
    this.maze = maze
    this.level = level
}

var mazeGame = new Game ("", 1)






/* ----------------------------------------------------------------------------------------
|
|    Generating the current map-instance to the DOM.
|    also includes jQuery functionalities (gameplay & visuals)
|
\----------------------------------------------------------------------------------------*/

Game.prototype.makeMap = function () {

     

    //creates empty div for each array-element, then adds it to the gameboard-div "gameboard"
    for (var i=0; i<20; i++) { 
        for(var j=0; j<32; j++) {
            var cellDiv = $( "<div id='" + i + "-" + j + "' class='cell'></div>" );
            $(".gameboard").append(cellDiv);


            //Adding CSS-classes to the different array-elements. 
            //For visuals AND gameplay-functionality (see jQuery section below)
            if( this.maze[i][j] == "O" ) {
                $( "#" + i + "-" + j ).addClass( "game-area" );

                //Adds visual borders only between "wall" and "game-area" divs
                if(this.maze[i][j-1] === "*") {
                    $( "#" + i + "-" + j ).addClass( "left-border" )
                }
                if(this.maze[i][j+1] === "*") {
                    $( "#" + i + "-" + j ).addClass( "right-border" )
                }
                if(this.maze[i-1][j] === "*") {
                    $( "#" + i + "-" + j ).addClass( "top-border" )
                }
                if(i<19 && this.maze[i+1][j] === "*") {
                    $( "#" + i + "-" + j ).addClass( "bottom-border" )
                }
            }
            //Adding the wall class.
            if( this.maze[i][j] == "*" ) {
                $( "#" + i + "-" + j ).addClass("wall");
            }
        }
    }
}

/* Explanation for map

* = wall/non-walkable
0 = grass
1 = acre/soil
2 = digged soil
3 = planted seeds
4 = crop to harvest
5 = Ironbar hidden
6 = Ironbar found

*/
var firstLevel = new Game([
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ]);

    firstLevel.makeMap()


    /* Movement control */

    var Keyboard = function() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.w = false;
        this.s = false;
        this.a = false;
        this.d = false;
    };
    
    // ASCII codes
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;
    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var KEY_W = 87;
    var KEY_S = 83;
    var KEY_A = 65;
    var KEY_D = 68;
    
    var DIR_E = 1;
    var DIR_NE = 2;
    var DIR_N = 4;
    var DIR_NW = 8;
    var DIR_W = 16;
    var DIR_SW = 32;
    var DIR_S = 64;
    var DIR_SE = 128;
    
    var isShift = false;
    //var key = [false, false, false, false];
    window.key = null;
    
    function InitializeKeyboard()
    {
        window.key = new Keyboard();
    
        $(document).keydown(function(e) {
            if (e.keyCode == 16) isShift = true;
            if (e.keyCode == KEY_LEFT) { key.left = true; }
            if (e.keyCode == KEY_RIGHT) { key.right = true; }
            if (e.keyCode == KEY_UP) { key.up = true; }
            if (e.keyCode == KEY_DOWN) { key.down = true; }
            if (e.keyCode == KEY_W) { key.w = true; }
            if (e.keyCode == KEY_S) { key.s = true; }
            if (e.keyCode == KEY_A) { key.a = true; }
            if (e.keyCode == KEY_D) { key.d = true; }
        });
    
        $(document).keyup(function(e) {
            if (e.keyCode == 16) isShift = false;
            if (e.keyCode == KEY_LEFT) { key.left = false; }
            if (e.keyCode == KEY_RIGHT) { key.right = false; }
            if (e.keyCode == KEY_UP) { key.up = false; }
            if (e.keyCode == KEY_DOWN) { key.down = false; }
            if (e.keyCode == KEY_W) { key.w = false; }
            if (e.keyCode == KEY_S) { key.s = false; }
            if (e.keyCode == KEY_A) { key.a = false; }
            if (e.keyCode == KEY_D) { key.d = false; }
        });
    }
    