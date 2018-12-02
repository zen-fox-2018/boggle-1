const kamus = require('./data.js');
// console.log(kamus.words);
// const kamusDummy = { words: ['APPLE', 'KUDA', 'JOB', 'DADU', 'OKRA'] };
const kDW = kamus.words;

class Boggle {
  constructor(input) {
    this.board = this.generateBoard(input);
    this.indexArr = [];
  }

  solve() {
    console.log(this.board);
    let counter  = 0;
    for (let i = 0; i < kDW.length; i++) {
      var indexKata = 0;
      var result = '';
      for (let j = 0; j < this.board.length; j++) {
        for (let k = 0; k < this.board[j].length; k++) {
          if (this.board[j][k] === kDW[i][indexKata]) {
            result += this.board[j][k];
            this.indexArr.push([j, k]);
            while (result !== kDW[i]) {
              indexKata += 1;
              if (this.findWords(j, k, kDW[i][indexKata])) {
                result += kDW[i][indexKata];
              } else {
                break;
              }
            }
          }
        }
      }
      if (result === kDW[i]) {
        counter += 1;
        this.indexArr = [];
      }
    }
    return `${counter} kata ditemukan`;
  }

  generateBoard(input) {
    let result = [];
    let kamus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < input; i++) {
      let arr = [];
      for (let j = 0; j < input; j++) {
        let random = Math.floor(Math.random() * kamus.length);
        arr.push(kamus[random]);
      }
      result.push(arr);
    }
    return result;

    // let example = [
    //   ['A', 'P', 'D', 'A', 'D'],
    //   ['P', 'K', 'S', 'U', 'K'],
    //   ['R', 'L', 'Y', 'A', 'O'],
    //   ['E', 'P', 'A', 'Y', 'V'],
    //   ['A', 'R', 'E', 'G', 'T']
    // ];
    // return example;
  }

  findWords(indexRow, indexCol, nextAlphabet) {
    //index min -1; index max+1 (both row and col);
    indexRow -= 1;
    indexCol -= 1;

    for (let i = indexRow; i < indexRow + 2; i++) {
      if (i < 0) {
        i = 0;
      } else if (i >= this.board.length) {
        i = this.board.length - 1;
      }
      for (let j = indexCol; j < indexCol + 2; j++) {
        if (j < 0) {
          j = 0;
        } else if (j >= this.board.length) {
          j = this.board.length - 1;
        }

        if (this.board[i][j] === nextAlphabet && this.notUsedCoordinate(i, j)) {
          this.indexArr.push([i, j]);
          return true;
        }
      }
    }
    return false;
  }

  notUsedCoordinate(indexRow, indexCol) {
    for (let i = 0; i < this.indexArr.length; i++) {
      if (indexRow == this.indexArr[i][0] && indexCol == this.indexArr[i][1]) {
        return false;
      }
    }
    return true;
  }

}

let boggle = new Boggle(4);
console.log(boggle.solve());
// boggle.solve();
