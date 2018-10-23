
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
function Game(maze) {
    this.maze = maze
    this.player = {
        y: 1,
        x: 1,
        //direction: "down"
    };
}

var player = {
    y: 1,
    x: 1,
}

const YMAX = 20;
const XMAX = 32;

var mazeGame = new Game ("")






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
            if( this.maze[i][j] == "0" ) {
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
var gameworld = new Game([
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "P", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
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

    gameworld.makeMap()





var playerPiece = '<div id="player"></div>';
$('.gameboard').append(playerPiece);


$(window).on("keydown", function(evt) {
    switch (evt.which) {
      case 37:
        console.log("left was called")
        movePlayer("left");
        
        break;
  
      case 38:
        movePlayer("up");
        console.log("up was called")
        break;
        
        case 39:
        movePlayer('right');
        console.log('right was called')
        break;
        
        case 40:
        movePlayer('down')
        console.log('down was called')
        break;
        default:
        console.log("invalid input");
    }
    $('#player').css({top: player.y *  22 + 'px'});
    $('#player').css({left: player.x *  22 + 'px'});
});



  function movePlayer(direction) {
    switch (direction) {
      // LEFT LEFT LEFT LEFT
      case "left":
        if (player.x < 1) {
          console.log("out of bounds");
          break;
        }
        player.x -= 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      // UP UP UP UP
      case "up":
        if (player.y < 1) {
          console.log("out of bounds");
          break;
        }
        player.y -= 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      // RIGHT RIGHT RIGHT RIGHT
      case 'right':
        if (player.x < 1) {
            console.log("out of bounds");
          break;
        }
        player.x += 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      //DOWN DOWN DOWN DOWN
      case 'down':
      if (player.y < 1) {
          console.log('out of bounds')
          break;
      }
      player.y += 1;
      console.log("X: " + player.x + "  Y: " + player.y);
        break;
    }
  }

  
  