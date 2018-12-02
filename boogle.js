const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(number) {
    this.board = [];
    this.number = this.shake(number)
    this.dummy = [
      ["D", "G", "H", "I"],
      ["K", "L", "P", "S"],
      ["Y", "E", "U", "T"], 
      ["E", "O", "R", "N"]
    ];
    this.sample = ["TURN","TRIP","APPLE","SUPER"];
    this.coordinates = [];
    this.kamus = kamus
  }

  shake(size) {

    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for(let i = 0; i < size; i++) {
      this.board.push([])
      for(let j = 0; j < size; j++) {
        let randomize = alphabet[Math.floor(Math.random()*alphabet.length)]
        this.board[i].push(randomize);
      }
    }
    return this.board
  }

  solve() { 
    let data = JSON.parse(JSON.stringify(this.kamus));

    //the code below is just temporary
    // console.log(this.sample)
    for(let i = 0; i < this.sample.length; i++) {
      // console.log(this.sample[i][0])
      this.findFirstLetter(this.sample[i][0]);
    }
  }
  
  findFirstLetter(words) {

    //check the first letter, see if it has any match in the dummy board
    for(let i = 0; i < this.dummy.length; i++) {
      for(let j = 0; j < this.dummy[i].length; j++) {
        if(this.dummy[i][j] === words) {
          this.coordinates.push([i, j]) // --> store the coordinates in an array
          // return true
        }
      }
    }
    // return false
  }

  checkGrid(row, column, words) {

    let rowStart = row - 1;
    let rowEnd = row + 1;

    let columnStart = column - 1;
    let columnEnd = column + 1;

    if(rowStart < 0) {
      rowStart = 0
    } else if (rowEnd > this.dummy.length - 1) {
      rowEnd = this.dummy.length - 1
    }

    if (columnStart < 0) {
      columnStart = 0
    } else if (columnEnd > this.dummy.length - 1) {
      columnEnd = this.dummy.length - 1
    }

    // console.log(this.dummy)
    for(let i = rowStart; i < rowEnd; i++) {
      for(let j = columnStart; j < columnEnd; j++) {
        // console.log(i, "======", j)
        if (this.dummy[i][j] === words) {
          return true
        }
      }
    }
    return false
  }
}

let boggle = new Boggle(4);
boggle.solve()
// console.log(boggle.findFirstLetter())
console.log(boggle.checkGrid(2, 3, "P"))

// console.log(dummy)
// console.log(dummy[0][0], dummy[1][1], dummy[2][2], dummy[3][3]) //--> diagonal kiri
// console.log(dummy[2][2], dummy[1][1], dummy[0][0]) // -- diagonal kanan