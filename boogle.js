const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(boardSize) {
    this.size = boardSize
    this.library = kamus.words
    this.board = this.shake()
    this.inputWords = this.generateInput()
    this.wordFound = []
  }

  generateInput() {
    let arrWords = []

    for (let i = 0; i < this.size; i++) {
      arrWords.push(this.library[Math.floor(Math.random() * this.library.length)])
    }

    return arrWords
  }

  shake() {

    let arrBoard = []

    for (let i = 0; i < this.size; i++) {
      let arrRow = []
      for (let j = 0; j < this.size; j++) {
        arrRow.push(String.fromCharCode(Math.floor(Math.random() * 26 + 65)))
      }
      arrBoard.push(arrRow)
    }

    this.generateInput()
    return arrBoard
  }

  checkRepeatedLetter(arrLetterIndex, i, j) {
    for (let index = 0; index < arrLetterIndex.length; index++) {
      if (i == arrLetterIndex[index][0] && j == arrLetterIndex[index][1]) {
        return true
      }
    }

    return false
  }

  checkGrid(wordInCheck, letterIndexI, letterIndexJ, arrLetterIndex) {
    let arrGrid = [letterIndexI - 1, letterIndexJ - 1, letterIndexI + 1, letterIndexJ + 1]

    for (let i = 0; i < arrGrid.length; i++) {
      if (arrGrid[i] < 0) {
        arrGrid[i] += 1
      }
      if (arrGrid[i] > this.board.length - 1) {
        arrGrid[i] -= 1
      }
    }
    let startI = arrGrid[0]
    let startJ = arrGrid[1]
    let endI = arrGrid[2]
    let endJ = arrGrid[3]

    arrLetterIndex.push([letterIndexI, letterIndexJ])

    for (let i = startI; i <= endI; i++) {
      for (let j = startJ; j <= endJ; j++) {
        if (!this.checkRepeatedLetter(arrLetterIndex, i, j)) {
          if (wordInCheck.length === 1 && this.board[i][j] === wordInCheck[0]) {
            return true
          }
          else if (this.board[i][j] === wordInCheck[0]) {
            return this.checkGrid(wordInCheck.slice(1), i, j, arrLetterIndex)
          }
        }
      }
    }

    return false

  }

  checkWord(wordInCheck) {
    let isWord = false

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == wordInCheck[0]) {
          isWord = this.checkGrid(wordInCheck.slice(1), i, j, [])
        }
      }
    }
    return isWord
  }


  solve() {

    console.log('cari kata: ')
    for (let i = 0; i < this.inputWords.length; i++) {
      console.log(this.inputWords[i])
    }

    console.log("\n")
    console.log(this.board)

    let counterWords = 0

    for (let i = 0; i < this.inputWords.length; i++) {
      counterWords += this.checkWord(this.inputWords[i])

      if (this.checkWord(this.inputWords[i])) {
        this.wordFound.push(this.inputWords[i])
      }

    }
    console.log("\n" + counterWords + " kata ditemukan:")

    for (let i = 0; i < this.wordFound.length; i++) {
      console.log(this.wordFound[i])
    }
  }

}

let boggle = new Boggle(8);

boggle.solve();


