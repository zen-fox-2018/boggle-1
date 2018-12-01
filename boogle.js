const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
// console.log(kamus);
class Boggle {
  constructor(num) {
    this.size = num;
    // this.myBoard =
    // [ [ 'R', 'W', 'M', 'G' ],
    //   [ 'O', 'Y', 'O', 'G' ],
    //   [ 'K', 'J', 'N', 'L' ],
    //   [ 'Z', 'N', 'H', 'P' ] ]

    this.myBoard = this.shake();
    this.dictionary = kamus;
    // this.dictionary = { words: ['MOMO'] };
  }

  shake () {
    let myResult = [];
    let tempResult = [];
    for (var i = 0; i < this.size * this.size; i++) {
      let index = 65 + Math.floor( Math.random() * 26);
      tempResult.push(String.fromCharCode(index));
      if(tempResult.length === this.size) {
        myResult.push(tempResult);
        tempResult = [];
      }
    }
    return myResult;
  }

  solve () {
    let myResult = [];
    console.log(this.myBoard);
    for (var i = 0; i < this.dictionary.words.length; i++) {
      if(this.checkSentence(this.dictionary.words[i]).length) {
        myResult.push(this.dictionary.words[i]);
      }

    }
    console.log(myResult);
  }

  checkSentence (sentence){
    let board = this.myBoard.map( e => e.slice(0));
    let myTrack = [];
    // let indexTrack = 0;
    let index = 0;
    if (this.getFirst(sentence[index]).length) {
      myTrack.push(this.getFirst(sentence[index]));
      // console.log(sentence[index], myTrack);
    } else {
      return [];
    }
    while (sentence[index + 1] != undefined) {
      debugger;
      for (var i = 0; i < myTrack[index].length; i++) {
        let x = myTrack[index][i].x;
        let y = myTrack[index][i].y;
        let huruf = board[x][y];
        board[x][y] = ' ';
        let cek = this.getNext([x, y], sentence[index + 1], board);
        if(cek.length) {
          myTrack.push(cek);
        } else if (i - 1 < 0) {
          return [];
        }
      }
      index++;
    }
    // console.log(myTrack);
    return myTrack;
  }

  getNext (index, search, board) {
    let myResult = [];
    let start = [index[0] - 1, index[1] - 1];
    let end = [index[0] + 1, index[1] + 1];
    start[0] < 0 ? start[0] = 0 : false;
    start[1] < 0 ? start[1] = 0 : false;
    end[0] >= this.size ? end[0] = this.size - 1 : false;
    end[1] >= this.size ? end[1] = this.size - 1 : false;

    for (let i = start[0]; i <= end[0]; i++) {
      for (var j = start[1]; j <= end[1]; j++) {
        if(board[i][j] === search) {
          myResult.push({x : i, y: j});
        }
      }
    }
    return myResult;
  }

  getFirst (search) {
    let myResult = [];
    for (let i = 0; i < this.myBoard.length; i++) {
      for (var j = 0; j < this.myBoard[i].length; j++) {
        if (this.myBoard[i][j] === search) {
          myResult.push({x : i, y: j});
        }
      }
    }
    return myResult;
  }


}

let boggle = new Boggle(4);
boggle.solve();
