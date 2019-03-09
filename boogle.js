
const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

// this.sample = ["TURN","TRIP","APPLE","SUPER"];
// this.dummy = [
//   ["D", "G", "H", "I"],
//   ["K", "L", "P", "S"],
//   ["Y", "E", "U", "T"], 
//   ["E", "O", "R", "N"]
// ];

class Boggle {
  constructor(number) {
    this.board = [];
    this.number = this.shake(number);
    this.dummy = [
      ["D", "G", "H", "I"],
      ["K", "L", "P", "S"],
      ["Y", "E", "U", "T"], 
      ["E", "O", "R", "N"]
    ];
    this.sample = ["TURN","TRIP","APPLE","SUPER"];
    this.coordinates = [];
    this.nextCoordinates = [];
    this.kamus = kamus;
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
    return this.board;
  }

  solve() { 
    let data = JSON.parse(JSON.stringify(this.kamus));
  }
  
  findFirstLetter(words) {
    //check the first letter, see if it has any match in the dummy board
    for(let i = 0; i < this.dummy.length; i++) {
      for(let j = 0; j < this.dummy[i].length; j++) {
        if(this.dummy[i][j] === words) {
          // this.coordinates.push([i, j]) 
          let firstWordIndex = {
            row: i,
            column: j
          }
          this.coordinates.push(firstWordIndex)
        }
      }
    }
  }

  checkGrid(row, column, words) {

    let rowStart = row - 1;
    let rowEnd = row + 1;

    let columnStart = column - 1;
    let columnEnd = column + 1;

    if(rowStart < 0) {
      rowStart = 0;
    } else if (rowEnd > this.dummy.length - 1) {
      rowEnd = this.dummy.length - 1;
    }

    if (columnStart < 0) {
      columnStart = 0;
    } else if (columnEnd > this.dummy.length - 1) {
      columnEnd = this.dummy.length - 1;
    }

    // console.log(this.dummy)
    let check = false
    for(let i = rowStart; i < rowEnd; i++) {
      for(let j = columnStart; j < columnEnd; j++) {
        if (this.dummy[i][j] === words) {
          // console.log(i, "======", j)
          let nextIndex = {
            row: i,
            column: j
          }
          this.nextCoordinates.push(nextIndex)
          check = true
        }
      }
    }
    return check
  }

  findWords() {
    // console.log("masuk ga")
    for(let i = 0; i < this.sample.length; i++) {
      let firstWord = this.sample[i][0]
      let firstLetter = this.findFirstLetter(firstWord)

      for(let j = 0; j < this.coordinates.length; j++) {
        let row = this.coordinates[j].row;
        let column = this.coordinates[j].column;

        this.dummy[row][column] = "#";
        
      }
    }
  }
}

let boggle = new Boggle(4);
// boggle.checkGrid(2, 3, "P")
boggle.solve()
boggle.findWords()

// console.log(dummy)
// console.log(dummy[0][0], dummy[1][1], dummy[2][2], dummy[3][3]) //--> diagonal kiri
// console.log(dummy[2][2], dummy[1][1], dummy[0][0]) // -- diagonal kanan