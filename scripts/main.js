
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
        
    };
}

var player = {
    y: 1,
    x: 1,
}

var counter = {
    avocados: 0,
    ironbars: 0,
}

const YMAX = 10;
const XMAX = 15;

var mazeGame = new Game ("")






/* ----------------------------------------------------------------------------------------
|
|    Generating the current map-instance to the DOM.
|    also includes jQuery functionalities (gameplay & visuals)
|
\----------------------------------------------------------------------------------------*/

Game.prototype.makeMap = function () {

     

    //creates empty div for each array-element, then adds it to the gameboard-div "gameboard"
    for (var i=0; i<11; i++) { 
        for(var j=0; j<16; j++) {
            var cellDiv = $( "<div id='" + i + "-" + j + "' class='cell'></div>" );
            $(".gameboard").append(cellDiv);
            


            //Adding CSS-classes to the different array-elements. 
            //For visuals AND gameplay-functionality (see jQuery section below)
            if( this.maze[i][j] == "0" ) {
                $( "#" + i + "-" + j ).addClass( "grass" );
            }
                //Adds visual borders only between "wall" and "game-area" divs
                if(this.maze[i][j] == "1") {
                    $( "#" + i + "-" + j ).addClass( "acre" );
                }
                //Adding the wall class.
            if( this.maze[i][j] == "*" ) {
                $( "#" + i + "-" + j ).addClass("wall");
            }
            if( this.maze[i][j] == "4" ) {
                $( "#" + i + "-" + j ).addClass("ironBarHidden");
            }
            
            
        }
    }
    console.log(this.maze);
}

/* Explanation for map

* = wall/non-walkable
0 = grass
1 = acre/soil
2 = planted seeds
3 = crop to harvest
4 = Ironbar hidden
5 = Ironbar found

*/


var gameworld = new Game([
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "4", "1", "1", "1", "1", "4", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "1", "4", "1", "1", "1", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "4", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "4", "1", "1", "1", "1", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "0", "*"],
    ["*", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "*"],
    ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"]
    
    ]);

    gameworld.makeMap()








$(window).on("keydown", function(evt) {
    switch (evt.which) {
      case 37:
        console.log("left was called")
        movePlayer("left");
        evt.preventDefault()
        break;
  
      case 38:
        movePlayer("up");
        evt.preventDefault()
        console.log("up was called")
        break;
        
        case 39:
        movePlayer('right');
        evt.preventDefault()
        console.log('right was called')
        break;
        
        case 40:
        movePlayer('down')
        evt.preventDefault()
        console.log('down was called')
        break;

        case 17:
        movePlayer('action')
        evt.preventDefault()
        console.log('action was called')
        break;

        default:
        console.log("invalid input");


    }
    $('#player').css({top: player.y *  42 + 'px'});
    $('#player').css({left: player.x *  42 + 'px'});
});

var playerPiece = '<div id="player"></div>';
$('.gameboard').append(playerPiece);

  function movePlayer(direction) {
    switch (direction) {
      // LEFT
      case "left":
      let obstacle = gameworld.maze[player.y][player.x - 1];
      if (obstacle == "*") {
        console.log("You are walking into a tree");
        break;
      }
        player.x -= 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      // UP
      case "up":
      this.obstacle = gameworld.maze[player.y - 1][player.x];
      if (this.obstacle == "*") {
        console.log("You are walking into a tree");
        break;
      }
        player.y -= 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      // RIGHT
      case 'right':
      this.obstacle = gameworld.maze[player.y][player.x + 1];
      if (this.obstacle == "*") {
        console.log("You are walking into a tree");
        break;
      }
        player.x += 1;
        console.log("X: " + player.x + "  Y: " + player.y);
        break;
      //DOWN
      case 'down':
      this.obstacle = gameworld.maze[player.y + 1][player.x];
      if (this.obstacle == "*") {
        console.log("You are walking into a tree");
        break;
      }
      player.y += 1;
      console.log("X: " + player.x + "  Y: " + player.y);
        break;
        //ACTION
      case 'action':
      let tile = gameworld.maze[player.y][player.x];
      if (tile == "0") {
          break;
      }
      if (tile == "1"){
      $('#'+ player.y + '-' + player.x).addClass('plantedSeeds').removeClass('acre')
      gameworld.maze[player.y][player.x] = '2'
      break;
      }
      if (tile == "2"){
      $('#'+ player.y + '-' + player.x).addClass('cropsToHarvest').removeClass('plantedSeeds')
      gameworld.maze[player.y][player.x] = '3'
      break;
      }
      if (tile == "3"){
      $('#'+ player.y + '-' + player.x).addClass('acre').removeClass('cropsToHarvest')
      gameworld.maze[player.y][player.x] = '1'
      counter.avocados ++;
      showScore()
      break;
      }
      if (tile == "4"){
      $('#'+ player.y + '-' + player.x).addClass('foundIronBar').removeClass('ironBarHidden')
      gameworld.maze[player.y][player.x] = '5'
      console.log(tile)
      break;
      }
      if (tile == "5"){
      $('#'+ player.y + '-' + player.x).addClass('acre').removeClass('foundIronBar')
      gameworld.maze[player.y][player.x] = '1'
      console.log(tile)
      counter.ironbars ++;
      showScore()
      checkWin();
      break;
      }
    
    
    }
    
        
    }    
   
    
    
  function showScore(){
        $('.avocadoScore').html('Avocados: ' + this.counter.avocados)
        $('.ironScore').html('Iron: ' + this.counter.ironbars)
    }

    function checkWin(){
        if(this.counter.ironbars == 5){
            alert('you won')
        }
    }
    


  
  