const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(boardSize) {
    this.board = this.shakeDummy(boardSize)
    this.wontChangeBoard = this.shakeDummy(boardSize)
    this.kamus = this.dict()
    this.size = boardSize
    this.dict = kamus.words
  }

  dict() {
    let kamus = ['TURN']//['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER']
    return kamus
  }

  shakeDummy(size) {
    let dummy = [
      ['D', 'G', 'H', 'I'],
      ['K', 'L', 'P', 'S'],
      ['Y', 'E', 'U', 'T'],
      ['E', 'O', 'R', 'N']
    ]
    return dummy
  }
 
  shake(size) {
    let finalBoard = []
    let boardLine = []
    let fullSize = size * size
    let abjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i <= fullSize; i++) {
      if (boardLine.length < size) {
        boardLine.push(abjad[Math.floor(Math.random() * abjad.length)])
      }
      else {
        finalBoard.push(boardLine)
        boardLine = []
        boardLine.push(abjad[Math.floor(Math.random() * abjad.length)])
      }
    }
    return finalBoard
  }

  solve() {
    let wordsFound = []
    for (let i = 0; i < this.kamus.length; i++) {
      let counterChar = 0
      let kata = ''
      let char = this.kamus[i][counterChar]
      kata = char
      for (let j = 0; j < this.board.length; j++) {
        for (let k = 0; k < this.board[j].length; k++) {
          debugger
          if (this.board[j][k] === char) {            
            counterChar++
            char = this.kamus[i][counterChar++]
            if (this.checkAround(char, j, k)) {
              kata += this.board[j][k]
              this.board[j][k] = '0'
            }
          }
        }
      }
      wordsFound.push(kata)
    }
    return this.board
    // return `${wordsFound.length} words found: ${wordsFound}`
  }

  checkAround(char, row, col) {
    let newRow = row - 1
    let endRow = row + 1
    let newCol = col - 1
    let endCol = col + 1
    if (newRow < 0) {
      newRow = 0
    } else if (newCol < 0) {
      newCol = 0 
    } else if (endRow >= this.size) {
      endRow = this.size - 1
    } else if (endCol >= this.size) {
      endCol = this.size - 1
    }
    for (let j = newRow; j < endRow; j++) {
      for (let k = newCol; k < endCol; k++) {
        if (this.board[j][k] === char) {
          return true
        } 
      }
    }
    return false
  }

  getIndexAround(char, row, col) {
    let newRow = row - 1
    let endRow = row + 1
    let newCol = col - 1
    let endCol = col + 1
    let index = []
    if (newRow < 0) {
      newRow = 0
    } else if (newCol < 0) {
      newCol = 0 
    } else if (endRow > this.size) {
      endRow = this.size - 1
    } else if (endCol > this.size) {
      endCol = this.size - 1
    }
    for (let j = newRow; j <= endRow; j++) {
      for (let k = newCol; k <= endCol; k++) {
        if (this.board[j][k] === char) {
          index.push(j)
          index.push(k)
        } 
      }
    }
    return index
  }
}

let boggle = new Boggle(4);
// boggle.solve();
console.log(boggle.solve());









