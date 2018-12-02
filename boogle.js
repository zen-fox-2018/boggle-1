const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(size) {
    this.board = this.shake(size)
    this.size = size
    // this.board = [ // dummy
    //   ['A', 'K', 'J', 'D'],
    //   ['Z', 'A', 'O', 'H'],
    //   ['G', 'E', 'B', 'R'],
    //   ['T', 'F', 'J', 'V']
    // ];
    // this.word = ['BET', 'BRO', 'GET','QWE', 'COK'] // dummy
    this.word = kamus.words
    this.output = []
  }

  shake(size) { // mengenerate board sesuai size
    let output = []

    for (let i = 0 ; i < size ; i++ ) {
      let array = []
      for (let j = 0 ; j < size ; j++ ) {
        array[j] = this.random()
      }
      output[i] = array
    }

    return output
  }

  random() { // method random u/ mengenerate huruf di board
    let kamus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let rand = Math.floor(Math.random() * kamus.length)

    return kamus[rand]
  }

  checkFirst(letter) { // dipake cek huruf pertama dari array
    for ( let i = 0 ; i < this.board.length ; i++ ) {
      if ( this.board[i].indexOf(letter) !== -1 ) {
        return [ i , this.board[i].indexOf(letter) ]
      }
    }

    return false
  }

  checkGrid (x, y , value) { // cek grid saat ketemu huruf pertama
    let istart = x - 1
    let jstart = y - 1
    let iover = istart + 2
    let jover = jstart + 2

    if ( istart < 0 ) {
      istart = 0
      iover = 1
    }
    if ( jstart < 0 ) {
      jstart = 0
      jover = 1
    }
    
    for ( let i = istart ; i <= iover ; i++ ) {
      for (let j = jstart ; j <= jover ; j++ ) {
        if (i < this.board.length && j < this.board.length){
          if (value === this.board[i][j]){
            return [i,j]
          }
        }
      }
    }

    return false
  }

  // pengecekan rekursif
  match( x, y, word , counter = 0) {
    let result = false
    if ( counter + 1 === word.length ) {
      return true
    } else {
      this.board[x][y] = '#'
      if ( this.checkGrid(x, y, word[counter+1] ) !== false) {
        let koor = this.checkGrid( x, y, word[counter+1] )
        result = this.match( koor[0], koor[1], word, counter+1 )
      }
    }

    this.board[x][y] = word[counter]

    return result
  }

  solve() {
    for ( let i = 0 ; i < this.word.length ; i++ ) {
      if ( this.checkFirst(this.word[i][0]) !== false ) {
        let koor = this.checkFirst(this.word[i][0])
        if (this.match(koor[0], koor[1], this.word[i])) {
          this.output.push(this.word[i])
        }
      }
    }

    console.log(`Size: ${this.size}`);
    console.log(this.board);
    console.log(this.output.join(' - '));
    console.log(`${this.output.length} WORDS FOUND!`);
  }
}

let boggle = new Boggle(4);

boggle.solve();
