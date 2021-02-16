import {canvas , ctx} from './index.js';

export class GameOfLife{ 
  constructor(){
      //defining size for cell
      this.cell_size = 5;
      //color for dead cells
      this.dead_color = '#181818';
      //color for living cells
      this.living_color = '#FF756B';
      //math for counting how many rows are needed
      this.cells_in_column = Math.floor(canvas.width / this.cell_size);
      //same but column
      this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
      //2d array that holds state of current life cycle
      this.active_array = [];
      //2d array that holds state of previous life cycle
      this.inactive_array = [];

      this.arrayInitialization = () => { //create 2 2d arrays with zeroes for initial coordinates
          //console.log("arrayInitialization");
          for(let i=0; i<this.cells_in_rows; i++){
              this.active_array[i] = [];
              for(let j=0; j<this.cells_in_column; j++){
                  this.active_array[i][j] = 0; //coords, what is this in the empty canvas? Dead center or top left?
              }
          }
          this.inactive_array = this.active_array

      }
      this.arrayRandomize = () => { //randomly filling active array with ones and zeros
          //console.log("arrayRandomize");
          for(let i = 0; i<this.cells_in_rows; i++){
              for(let j=0; j<this.cells_in_column; j++){
                  this.active_array[i][j] = (Math.random()>0.5) ? 1 : 0;
                  //console.log(this.active_array[i][j]);
              }
          }
      }
      this.fillArray = () => { //filling array with color based on its state (1 - active, 0 - inactive)
          //console.log("fillArray");
          for(let i = 0; i<this.cells_in_rows; i++){
              for(let j=0; j<this.cells_in_column; j++){
                  let color;
                  if (this.active_array[i][j] == 1){
                      color = this.living_color;
                  } else {
                      color = this.dead_color;
                  }
                  ctx.fillStyle = color;
                  ctx.fillRect(j*this.cell_size, i*this.cell_size, this.cell_size, this.cell_size) // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect ctx.fillRect(x,y,width,height)
                  //console.log(color);
              }
          }   
      }
      this.countNeighbors = (row, col) => { //counting neighbors for one cell
          //console.log("countNeighbors");
          let total_neighbors = 0;
          total_neighbors += this.setCellValueHelper(row +1, col );
          total_neighbors += this.setCellValueHelper(row + 1, col + 1);
          total_neighbors += this.setCellValueHelper(row , col + 1);
          total_neighbors += this.setCellValueHelper(row - 1, col + 1);
          total_neighbors += this.setCellValueHelper(row - 1, col );
          total_neighbors += this.setCellValueHelper(row - 1, col - 1);
          total_neighbors += this.setCellValueHelper(row , col - 1);
          total_neighbors += this.setCellValueHelper(row + 1, col - 1);
          return total_neighbors;
      }
      this.setCellValueHelper = (row,col) =>{
          //console.log("setCellValueHelper");
          try{
              return this.active_array[row][col];
          }catch{
              return 0;
          }
      }
      this.updateCellValue = (row,col) => { //updating cell value based on sum of its neighbors and returning 0 or 1 accordingly
          //console.log("updateCellValue");
          const total = this.countNeighbors(row, col);
          if(total > 4 || total < 3){ //game rule: cells with >4 or <3 neighbors dies 0 => 0, 1 => 0
              return 0;
          } else if (this.active_array[row][col] === 0 && total ===3){ //game rule 2: cells with 3 neighbors grows to be alive from deat 0 => 1
              return 1;
          } else { //or returning its status back 0 => 0; 1 => 1
              return this.active_array[row][col];
          }

      }
      this.updateLifeCycle = () => { //setting new cell value to inactive array
          //console.log("updateLifeCycle");
          for(let i = 0; i<this.cells_in_rows; i++){
              for(let j=0; j<this.cells_in_column; j++){
                  let new_state = this.updateCellValue(i,j);
                  this.inactive_array[i][j] = new_state;
              }
          }
          this.active_array = this.inactive_array;
      }
      this.gameSetup = () => {
          //console.log("gameSetup");
          this.arrayInitialization();
      }
      this.runGame = () => {
          //console.log("runGame");
          this.updateLifeCycle();
          this.fillArray();
      }
  }
}