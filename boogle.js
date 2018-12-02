const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(sizeBoard) {
    this.size = sizeBoard;
    this.dictionary = kamus.words
    this.dummy = this.generateWords()
    this.board = this.shake();
    this.history = [];
  }

  generateWords() {
    let takeWords = [];

    for (let i = 0; i < this.size; i++) {
      takeWords.push(this.dictionary[Math.floor(Math.random() * this.dictionary.length)])
    }
    return takeWords
  }


  shake() {
    let generateBoard = [];

    for (let i = 0; i < this.size; i++) {
      let miniBoard = [];
      for (let j = 0; j < this.size; j++) {
        let randomAlphabet = String.fromCharCode(Math.floor(Math.random() * 26 + 65))
        miniBoard.push(randomAlphabet)
      }
      generateBoard.push(miniBoard)
    }
    return generateBoard
  }

  solve() {
    let result = [];
    let wordsFound = 0;

    for (let i = 0; i < this.dummy.length; i++) {
      if (this.findWords(this.dummy[i])) {
        result.push(this.dummy[i])
        wordsFound++
      }
      this.history = []
    }
    console.log(this.dummy.join('\n'));
    console.log(this.board)
    console.log(`\n${wordsFound} words found :\n${result.join('\n')}`)
  }

  checkNeighbor(words, i, j, history) {
    let min_x = i - 1;
    let min_y = j - 1;
    let max_x = i + 1;
    let max_y = j + 1;
    
    if (min_x < 0) min_x = 0
    if (min_y < 0) min_y = 0
    if (max_x > this.board.length - 1) max_x -= 1
    if (max_y > this.board.length - 1) max_y -= 1
    
    history.push([i, j])
    
    for (let i = min_x; i <= max_x; i++) {
      for (let j = min_y; j <= max_y; j++) {
        if (this.checkRepeated(i, j, history)) {
          if (words.length === 1 && this.board[i][j] === words[0]) {
            return true
          }
          else if (this.board[i][j] === words[0]) {
            return this.checkNeighbor(words.slice(1), i, j, history)
          }
        }
      }
    }
  }

  findWords(words) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == words[0]) {
          if (this.checkNeighbor(words.slice(1), i, j, this.history)) {
            return true
          }
        }
      }
    }
    return false
  }

  checkRepeated(i, j, history) {
    for (let index = 0; index < history.length; index++) {
      if (i == history[index][0] && j == history[index][1]) {
        return false
      }
    }
    return true
  }

}

let boggle = new Boggle(process.argv[2]);
boggle.solve();