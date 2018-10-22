var grid = new Grid({
    rows: 10,
    cols: 5,
    render: {
        placeholder: ".grid"
    }
});


//I have to figure out if I use this 2d array


var grid2 = [
[1,2,3,4,5,6,7,8,9,10],
[11,12,13,14,15,16,17,18,19,20],
[21,22,23,24,25,26,27,28,29,30],
[31,32,33,34,35,36,37,38,39,40],
[41,42,43,44,45,46,47,48,49,50],
[51,52,53,54,55,56,57,58,59,60],
[61,62,63,64,65,66,67,68,69,70],
[71,72,73,74,75,76,77,78,79,80],
[81,82,83,84,85,86,87,88,89,90],
[91,92,93,94,95,96,97,98,99,100]
]


// or this 1 d array

var grid3 = [
1,2,3,4,5,6,7,8,9,10,
11,12,13,14,15,16,17,18,19,20,
21,22,23,24,25,26,27,28,29,30,
31,32,33,34,35,36,37,38,39,40,
41,42,43,44,45,46,47,48,49,50,
51,52,53,54,55,56,57,58,59,60,
61,62,63,64,65,66,67,68,69,70,
71,72,73,74,75,76,77,78,79,80,
81,82,83,84,85,86,87,88,89,90,
91,92,93,94,95,96,97,98,99,100
]

$('.grid3').innerHtml(grid3)



var map = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

/* MapRenderer.draw and MapRenderer.drawTile
draw: function(){
var self = this;
this.context.clearRect(0, 0, this.w, this.h);
this.context.fillStyle = "rgba(255,0,0,0.6)";
_(this.map).each(function(row,i){
_(row).each(function(tile,j){
if(tile !== 0){ //if tile is not walkable
self.drawTile(j,i); //draw a rectangle at j,i
}
});
});
},
drawTile: function(x,y){
this.context.fillRect(
x * this.tileSize, y * this.tileSize,
this.tileSize, this.tileSize
);
}

*/


(function( global ) {
    
  
    function Cell( config ) {
      this.$el = config.$element;
      this.x = config.x;
      this.y = config.y;
    }
  
    function Grid( config ) {
      this.grid = [];
      this.cells = [];
      this.rowsCount = config.rows;
      this.colsCount = config.cols;
      this.rows = [];
      this.cols = [];
      if (config.render) {
        this.placeholder = config.render.placeholder;
        this.render();
      }
    }
    Grid.prototype = {
      createCell: function( config ) {
        return new Cell(config);
      },
      getCellAt: function( x, y ) {
        if (!this.grid[y]) {
          console.warn("No such Y coordinate: %i (grid size is: x[%i], y[%i])", y, this.colsCount, this.rowsCount);
          return false;
        }
        if (!this.grid[y][x]) {
          console.warn("No such X coordinate: %i (grid size is: x[%i], y[%i])", x, this.colsCount, this.rowsCount);
          return false;
        }
        return this.grid[y][x];
      },
      render: function( options ) {
        if (options && options.placeholder) {
          this.placeholder = options.placeholder;
        }
        this.$placeholder = $(this.placeholder);
        if (!this.placeholder || this.$placeholder.length === 0) {
          console.error('Placeholder is not present');
          return;
        }
        var i, j, $row, $cell, cell, cellId = 0;
        for (i = 0; i < this.rowsCount; i += 1) {
          this.grid[i] = [];
          $row = $('<div class="row"></div>').prependTo(this.$placeholder);
          for (j = 0; j < this.colsCount; j += 1) {
            $cell = $('<div class="cell"></div>').appendTo($row);
            cell = this.createCell({$element: $cell, x: j, y: i});
            this.grid[i].push(cell);
            this.cells.push(cell);
          }
        }
        // rows
        var self = this;
        this.grid.forEach(function( row ) {
          self.rows.push(row);
        });
      }
    };
  
    global.Grid = Grid;
  
  }( window ));

  
  