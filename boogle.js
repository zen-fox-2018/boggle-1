const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(number) {
    this.board = [];
    this.number = this.shake(number)
  }

  shake(size) {
    
    let alphabet = "abcdefghijklmopqrstuvwxyz";

    for(let i = 0; i < size; i++) {
      this.board.push([])
      for(let j = 0; j < size; j++) {
        let randomize = alphabet[Math.floor(Math.random()*alphabet.length)]
        this.board[i].push(randomize);
      }
    }
    return this.board
  }
}

let boggle = new Boggle(4);
console.log(boggle.shake());
// boggle.solve();
