const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(dimension) {
    this.BoogleBoard = this.board(dimension);
    this.dummyBoard = [
      ['A', 'K', 'J', 'D'],
      ['Z', 'A', 'O', 'H'],
      ['G', 'E', 'B', 'R'],
      ['T', 'F', 'J', 'V']
    ]
    this.kamusDummy = ['AKA', 'BOBO', 'JOB', 'JODOH', 'GET', 'ZEBRA'];
    this.kamus = kamus.words;
  }

  board(dimension) {
    let theBoard = [];
    for (let i = 1; i <= dimension; i++) {
      let temp = [];
      for(let j = 1; j <= dimension; j++) {
        let alphabet = this.shake();
        temp.push(alphabet);
      }
      theBoard.push(temp);
    }
    return theBoard;
  }

  shake() {
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let index = Math.round(Math.random() * 25);
    return alphabets[index];
  }

  solve() {
    let result = [];
    let counter = 0;
    for (let i = 0; i <= this.kamus.length-1; i++) {
      if (this.firstWordMatchDetector(this.kamus[i]) === true) {
        counter++;
        result.push(this.kamus[i]);
      } 
    }
    console.log(this.BoogleBoard)
    console.log(`${counter} words found: ${"\n"}${result.join('\n')}`);
  }

  firstWordMatchDetector(word) {
    for (let i = 0; i <= this.BoogleBoard.length-1; i++) {
      for (let j = 0; j <= this.BoogleBoard[i].length-1; j++) {
        if (this.BoogleBoard[i][j] === word[0]) {
          if (this.closestWordDetector(word, [i, j]) === true) {
             return true;
          }
        }
      }
    }
    return false;
  }

  closestWordDetector(word, coordinate) {
    let listCoordinate = [];
    listCoordinate.push(coordinate);
    let rowStart = this.getIndexStart(coordinate[0]);
    let rowEnd = this.getIndexEnd(coordinate[0]);
    let colStart = this.getIndexStart(coordinate[1]);
    let colEnd = this.getIndexEnd(coordinate[1]);

    let k = 1
    while (k <= word.length-1) {
      let isFound = false
      for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
          if (this.BoogleBoard[i][j] === word[k]) {
            if (this.isBlackListed(listCoordinate, [i, j]) === false) {
              listCoordinate.push([i, j]);
              rowStart = this.getIndexStart(i);
              rowEnd = this.getIndexEnd(i);
              colStart = this.getIndexStart(j);
              colEnd = this.getIndexEnd(j);
              isFound = true;
              break;
            }
          }
        }
        if (isFound === true) {
          k++;
          break;
        }
      }
      if (isFound === false) {
        return false;
      }
    }
    return true;
  }

  isBlackListed(list, coordinate) {
    for (let i = 0; i <= list.length-1; i++) {
      if (coordinate[0] === list[i][0] && coordinate[1] === list[i][1]) {
        return true;
      }
    }
    return false;
  }

  getIndexStart(index) {
    let indexStart = index;
    if (this.BoogleBoard[indexStart - 1] !== undefined) {
      indexStart = indexStart - 1;
    }
    return indexStart;
  }

  getIndexEnd(index) {
    let indexEnd = index;
    if (this.BoogleBoard[indexEnd + 1] !== undefined) {
      indexEnd = indexEnd + 1;
    }
    return indexEnd;
  }
}

let boggle = new Boggle(5);
boggle.solve();
// console.log(boggle.kamus)
// boggle.shake()
/*
      ['A', 'K', 'J', 'D'],
      ['Z', 'A', 'O', 'H'],
      ['G', 'E', 'B', 'R'],
      ['T', 'F', 'J', 'V']

      ['AKA', 'BOBO', 'JOB', 'JODOH', 'GET', 'ZEBRA'];


        ['D', 'G', 'H', 'I'],
      ['K', 'L', 'P', 'S'],
      ['Y', 'E', 'U', 'T'],
      ['E', 'O', 'R', 'N']

      ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'ZEBRA'];
*/