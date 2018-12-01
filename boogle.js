const kamus = require('./data.js');

class Boggle {
  constructor(boardSize) {
    this.boardSize = boardSize
    this.board = []
    this.words = kamus.words
  }

  //RANDOM BOARD
  shake() {
    let boardTemp = []
    let alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        boardTemp.push(alphabet[Math.floor(Math.random() * alphabet.length)])
      }
      this.board.push(boardTemp)
      boardTemp = []
    }
  }

  searchDepth(word, r, c) {
    if (word.length <= 1) return true;
    this.board[r][c] = '#'
    let result = false

    //ARAH MATA ANGIN / DIRECTION
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let nextr = r + j
        let nextc = r + i
        if (nextr >= 0 && nextr < this.board.length &&
          nextc >= 0 && nextc < this.board[nextr].length &&
          this.board[nextr][nextc] == word[1] &&
          this.searchDepth(word.slice(1), nextr, nextc)) {
          result = true
          break
        }
      }
    }

    this.board[r][c] = word[0]
    return result
  }

  checkWord(word) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == word[0] && this.searchDepth(word, i, j)) {
          return true
        }
      }
    }
    return false
  }

  solve() {
    let result = []
    for (let i = 0; i < this.words.length; i++) {
      this.checkWord(this.words[i]) && result.push(this.words[i])
    }
    console.clear()
    console.log(this.board);
    console.log(`${result.length} WORDS FOUND! \n ${result.join(`,`)}`);
  }
}

let boggle = new Boggle(4);
boggle.shake();
boggle.solve();
