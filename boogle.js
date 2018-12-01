const kamus = require('./data.js');
const words = kamus.words
//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(dimension) {
    this.dimension = dimension
    this.board = this.shake()
    this.boardreset = JSON.parse(JSON.stringify(this.board))
    this.firstCharLoc = []
    this.historyLoc = []
  }

  shake() {
    let board = []
    let dic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i = 0; i < this.dimension; i++) {
      let temp = []
      for (let j = 0; j < this.dimension; j++) {
        let random = Math.floor(Math.random()*25 + 1)
        temp.push(dic[random])
      }
      board.push(temp)
    }
    return board
  }

  solve() {
    let wordsFound = 0
    let result = []
    for (let i = 0; i < words.length; i++) {
      this.board = JSON.parse(JSON.stringify(this.boardreset))
      this.firstCharLoc = []
      if (this.check(words[i])) {
        result.push(words[i])
        wordsFound++
      }
    }
    return console.log(`${wordsFound} words found\n${result.join(',\n')}`);
  }

  check(words) {
    if (this.searchFirstChar(words)) {
      for (var i = 0; i < this.firstCharLoc.length; i++) {
        this.historyLoc = []
        this.historyLoc.push(this.firstCharLoc[i])
        for (let i = 1; i < words.length; i++) {
          if (this.historyLoc.length === 0) {
            return false
          }
          let lastIndex = this.historyLoc.length - 1
          let row = this.historyLoc[lastIndex].row
          let col = this.historyLoc[lastIndex].col
          this.board[row][col] = "Kosong"
          if (this.checkGrid(row, col, words[i])=== false) {
            this.historyLoc.splice(-1,1)
            i = i - 2
          }
        }
      }
    }
    else if (this.searchFirstChar(words) === false) {
      return false
    }
    return true
  }

  checkGrid(row, col, valueCheck) {
    let rowStart = row - 1
    let rowEnd = row + 1
    let colStart = col - 1
    let colEnd = col + 1

    if (rowStart < 0) {
      rowStart = 0
    }
    if (rowEnd > this.dimension - 1) {
      rowEnd = this.dimension - 1
    }
    if (colStart < 0) {
      colStart = 0
    }
    if (colEnd > this.dimension - 1) {
      colEnd = this.dimension - 1
    }

    for (let i = rowStart; i <= rowEnd; i++) {
      for (let j = colStart; j <= colEnd; j++) {
        if (this.board[i][j] === valueCheck) {
          let obj = {
            row: i,
            col: j
          }
          this.historyLoc.push(obj)
          return true
        }
      }
    }
    return false
  }

  searchFirstChar(word) {
    let check = false
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === word[0]) {
          let obj = {
            row: i,
            col: j
          }
          this.firstCharLoc.push(obj)
          check = true
        }
      }
    }
    return check
  }

}

let boggle = new Boggle(4);
console.log(boggle.board);
boggle.solve();
