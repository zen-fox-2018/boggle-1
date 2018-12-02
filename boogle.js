const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
var exampleBoard = [['A', 'K', 'J', 'D'],
                    ['Z', 'A', 'O', 'H'],
                    ['G', 'E', 'B', 'R'],
                    ['T', 'F', 'J', 'V']];

class Boggle {
  constructor(num) {
    this.letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.boxSize = num;
    this.dictionary = kamus.words;
    this.boggleBoard = this.shake();
    this.result = {};
    this.dirCheck = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];
  }

  solve() {
    var word = '';
    var usedCoordinate = [];
    for (var i = 0; i < this.boggleBoard.length; i++) {
      for (var j = 0; j < this.boggleBoard[i].length; j++) {
        word += this
      }
    }
  }

  //letter check in dictionary
  findWord(word, dictionary){
    for (var i = 0; i < dictionary.length; i++) {
      for (var j = 0; j < dictionary[i].length; j++) {
        // katanya ketemu
        if (dictionary[i] === word){
          return 1;
        }
        // ketemu perkata
        else if (dictionary [i][j] === word[j]) {
          return true;
        }
      }
    }
    return false;
  }

  result(word){
    this.result.push(word);
  }

  shake(){
    var box = this.boxSize;
    var result = [];
    for (let i = 0; i < box; i++) {
      var fillResult = [];
      for (let j = 0; j < box; j++) {
        var letter = this.letter.charAt(Math.floor(Math.random()*this.letter.length));
        fillResult.push(letter);
      }
      result.push(fillResult);
    }
    console.log(result);
  }
}

let boggle = new Boggle(4);
boggle.shake();
// boggle.solve();
