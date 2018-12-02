const kamus = require('./data.js');

//value kamus bertipe object of array

class Boggle {
  constructor(size) {
    this.size = size
    this.board = this.shake()
    this.newBoard = this.board.map(e => e.slice(0))
  }

  randomAlphabet() {
    let alphabet = 'ABCEDFGHIJKLMNOPQRSTUVWXYZ'
    return alphabet[Math.floor(Math.random() * 26)]
  }

  shake() {
    let board = []
    for (let i = 0; i < this.size; i++) {
      let row = []
      for (let j = 0; j < this.size; j++) {
        row.push(this.randomAlphabet())
      }
      board.push(row)
    }
    return board
  }

  checkAlphabet(row, col, alphabet) {
    let board = this.newBoard
    let rowStart = row - 1
    let rowEnd = row + 1
    let colStart =  col - 1
    let colEnd = col + 1

    if(rowStart < 0) {
      rowStart = 0
    } else if (rowEnd > board.length - 1) {
      rowEnd = board.length - 1
    } else if (colStart < 0) {
      colStart = 0
    } else if (colEnd > board.length - 1) {
      colEnd = board.length - 1
    }

    for(let i = rowStart; i <= rowEnd; i++) {
      for(let j = colStart; j <= colEnd; j++) {
        if(board[i][j] === alphabet) {
          return [i, j]
        }
      }
    }

    return false
  }

  checkWord(coord, word) {
    let newCoord = coord 
    for(let i = 1; i < word.length; i++) {
        if(this.checkAlphabet(newCoord[0], newCoord[1], word[i])) {
        newCoord = this.checkAlphabet(newCoord[0], newCoord[1], word[i])
        this.newBoard[newCoord[0]][newCoord[1]] = '#'
      } else {
        return false
      }
    }
    return true
  }
  
  solve() {
    let result = {}
    for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board[i].length; j++) {

        for(let k = 0; k < kamus.words.length; k++) {
          this.newBoard = this.board.map(e => e.slice(0))
          if(kamus.words[k][0] === this.board[i][j]) {
            this.newBoard[i][j] = '#'
            if(this.checkWord([i,j], kamus.words[k]) === true) {
              result[kamus.words[k]] = ''
            }
          }
        }
      }
    }
    return `Words Found ${Object.keys(result).length}\n${Object.keys(result).sort('').join(', ')}`
  }
}

let boggle = new Boggle(4)
console.log(boggle.board)
console.log(boggle.solve())
