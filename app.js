// Prints maze in the console (used for testing):
function printmaze1(maze) {
  for (var i = 0; i < maze.length; i++) {
    var row1 = '';
    for (var j = 0; j < maze[i].length; j++) {
      if (j < maze[i].length -1) row1+=maze[i][j] + '    ' ;
      else row1+=maze[i][j];
    };
    console.log(row1);
  }
}

// Generates random maze:
function createMaze(rows,columns,rndthreshold=.2){
  var maze = new Array(columns);
  for (var i = 0; i < maze.length; i++) {
      maze[i]=  new Array(rows);
      for (var j = 0; j < maze[i].length; j++) {
        maze[i][j] = Math.random() < rndthreshold ? 'x' : '.'
      }
  }
  maze[columns-1][ Math.round(Math.random()*(rows-1))]='*';
  maze[0][0]='.';
  return maze;
}

// prints maze to DOM:
function createmazetable(maze){
  var finalmaze = '<table id="maze-table">';
  for (var i = 0; i < maze.length; i++) {
    finalmaze+='<tr>';
    for (var j = 0; j < maze[i].length; j++) {
      if (maze[i][j]=='x'){
        finalmaze+='<td id="maze-table" style="background-color:black">O</td>'
      }else if (maze[i][j]=='*') {
          finalmaze+='<td id="maze-table" style="background-color:#9D695A">coffee!</td>'
      }else if (maze[i][j]=='P') {
         finalmaze+='<td id="maze-table" style="background-color:yellow">O</td>'
      }
      else{
         finalmaze+='<td>O</td>'
      }
    };
    finalmaze+='</tr>';
  };
  finalmaze+='</table>';
  return finalmaze;
}

// takes in maze
// recursively calls traverse function to find solution or declare unsolvable:
function mazeTraverser(maze){
  this.maze = maze;
  var path = [];
  printmaze1(this.maze);
  this.getpath = function(){
    return path;
  }
  this.traverse = function(column, row){
    var currentChar = this.maze[column][row];
    if(currentChar === '*'){
      printmaze1(this.maze);
      path.push([column, row]);
      return path;
    } else if (currentChar === 'x' || currentChar === 'v'){
      return -9;
    } else if (currentChar === '.'){
      this.maze[column][row] = 'v';
      if (column < this.maze.length - 1){
        var down = this.traverse(column + 1, row);
        if (down !== -9){
          path.push([column, row]);
          return path;
        }
      }
      if (row < this.maze[column].length - 1) {
        var right = this.traverse(column, row + 1);
        if (right !== -9){
          path.push([column, row]);
          return path;
        }
      }
      if (column > 0){
        var up = this.traverse(column - 1, row);
        if (up !== -9){
          path.push([column, row]);
          return path;
        }
      }
      if (row > 0){
        var left = this.traverse(column, row - 1);
        if (left !== -9){
          path.push([column, row]);
          return path;
        }
      }
    }
    return -9;
  }
}


// sample maze before maze generation function:
// var maze1 = [
//     ['.', '.', '.', 'x', '.', 'x', 'x', '.', '.', 'x'],
//     ['x', 'x', '.', '.', 'x', 'x', 'x', '.', '.', 'x'],
//     ['.', '.', 'x', '.', '.', '.', 'x', '.', '.', 'x'],
//     ['x', 'x', '.', '.', 'x', '.', '.', '.', 'x', 'x'],
//     ['.', '.', 'x', '.', '.', 'x', 'x', '.', '.', 'x'],
//     ['x', 'x', '.', '.', 'x', 'x', 'x', '.', '.', 'x'],
//     ['.', '.', 'x', '.', '.', '.', '.', '.', 'x', 'x'],
//     ['x', 'x', '.', '.', 'x', 'x', 'x', 'x', '.', 'x'],
//     ['.', '.', '.', '.', '.', 'x', 'x', '.', 'x', 'x'],
//     ['*', '.', '.', 'x', 'x', 'x', '.', '.', '.', 'x']];

// var checkMaze = new mazeTraverser(maze1);
// checkMaze.traverse(0, 0);