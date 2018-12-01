const kamus = require('./data.js');

//value kamus bertipe object of array
// const kamus = {words: ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'GLGL']}
// const kamus = {words: ['TRIP', 'TURN', 'SUPER', 'GLGL']}

//silahkan di-console.log sendiri

class Boggle {
  constructor(size) {
    this.size = size
    this.board = this.shake()
    this.testBoard = this.board.map(e => e.slice(0))
    this.kamus = kamus
    this.result =[]
  }

  shake() {
    let size = this.size
    let board = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j < size; j++) {
        let random = Math.floor(Math.random() * (90 - 65 + 1)) + 65
        row.push(String.fromCharCode(random))
      }
      board.push(row)
    }
    // let board = [
    //   ['T', 'G', 'H', 'I'],
    //   ['K', 'L', 'P', 'S'],
    //   ['Y', 'E', 'U', 'T'],
    //   ['E', 'O', 'R', 'N']
    // ]
    return board
  }

  solve() {
    let board = this.board
    let kamus = this. kamus
    
    board.forEach((row, i) => {
      row.forEach((alphabet, j) => {

        kamus.words.forEach(word => {
          this.testBoard = this.board.map(e => e.slice(0))
          if (word[0] === alphabet) {
            this.testBoard[i][j] = ' '
            var check = this.checkWord([i, j], word)
          }
          if (check === true) {
            this.result.push(word)
          }
        });

      });
    });
    console.log(`Words Found ${this.result.length}:\n${this.result.join('\n')}`);
    
  }

  checkWord(coord, word) {
    let newCoord = coord
    let check = false
    // console.log(word);
    // console.log(newCoord);
    
    for (let i = 1; i < word.length; i++) {
      if (this.checkAlphabet(newCoord, word[i])) {
        newCoord = this.checkAlphabet(newCoord, word[i])
        this.testBoard[newCoord[0]][newCoord[1]] = ' '
        // console.log('hi', word[i], newCoord);

      } else {
        // console.log('ini check gagal');
        
        check = false
        return check
      }
    }
    check = true
    return check
  }

  checkAlphabet(coord, alphabet) {
    let board = this.testBoard
    let start = [coord[0]-1, coord[1]-1]
    let end = [coord[0]+1, coord[1]+1]

    start[0] < 0 ? start[0] = 0:start[0] = start[0];
    start[1] < 0 ? start[1] = 0:start[1] = start[1];
    end[0] >= board.length-1 ? end[0] = board.length-1:end[0] = end[0];
    end[1] >= board.length-1 ? end[1] = board.length-1:end[1] = end[1];

    for (let i = start[0]; i <= end[0]; i++) {
      for (let j = start[1]; j <= end[1]; j++) {
        if (board[i][j] === alphabet) {
          // console.log(this.testBoard);
          return [i, j]
        }
      }
    }
    return false
  }

}

let boggle = new Boggle(4);
console.log(boggle.board);
// console.log(kamus.words);

boggle.solve();

// console.log(boggle.checkAlphabet([0, 3]));
// boggle.shake();
