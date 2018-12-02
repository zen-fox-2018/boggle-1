const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
// console.log(kamus);
class Boggle {
  constructor(num) {
    this.size = num;
    // this.myBoard =
    // [ [ 'D', 'E', 'H', 'I'],
    //   [ 'K', 'L', 'P', 'S' ],
    //   [ 'Y', 'E', 'U', 'T' ],
    //   [ 'E', 'O', 'R', 'N' ] ]

    this.myBoard = this.shake();
    this.dictionary = kamus;
    // this.dictionary = { words: [ 'APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER' ] };
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
      if(this.checkWord(this.dictionary.words[i]).length) {
        myResult.push(this.dictionary.words[i]);
      }

    }

    console.log(`${myResult.length} WORDS FOUND : `);
    myResult.forEach(e => console.log(`- ${e}`));
  }

  checkWord (word){
    let myTrack = [];
    let index = 0;
    let board = JSON.parse(JSON.stringify(this.myBoard));
    let checkFirst = this.getFirst(word[0], board);
    if(checkFirst.length) {
      myTrack.push(checkFirst);
    } else {
      return [];
    }

    while (word[index + 1] != undefined) {
      let tempResult = [];
      for (let i = 0; i < myTrack[index].length; i++) {
        let nextCheck = myTrack[index][i];
        let checkBoard = JSON.parse(JSON.stringify(nextCheck.board));
        if (this.getNext(nextCheck.index, word[index + 1], nextCheck.board).length) {
          this.getNext(nextCheck.index, word[index + 1], nextCheck.board).forEach( e => tempResult.push(e));
        }
      }
      if(tempResult.length) {
        myTrack[myTrack.length] = tempResult;
      } else {
        return [];
      }
      index++;
    }
    return myTrack;
  }

  //get the letters around's index
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
        let nextBoard = JSON.parse(JSON.stringify(board));
        if(nextBoard[i][j] === search) {
          nextBoard[i][j] = ' ';
          myResult.push({index : [i,j], board : JSON.parse(JSON.stringify(nextBoard))});
        }
      }
    }
    return myResult;
  }
  //get first letter index
  getFirst (search, board) {
    let myResult = [];
    for (let i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        let firstBoard = JSON.parse(JSON.stringify(board));
        if (firstBoard[i][j] === search) {
          firstBoard[i][j] = ' ';
          myResult.push({index : [i,j], board : JSON.parse(JSON.stringify(firstBoard))});
        }
      }
    }
    return myResult;
  }


}

let boggle = new Boggle(4);
boggle.solve();
// console.log(boggle.myBoard);
