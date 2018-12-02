const kamus = require('./data.js');

// let kamus = { words: ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER'] }
// const kamus = { words: ['APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'GLGL'] }

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(input) {
    this.input = input
    this.board = this.shake()
    this.copy = this.board.map(e => e.slice(0))
    this.book = kamus.words
    this.kata = []
  }

  shake() {
    let kotak = []
    let huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    for (let i = 0; i < this.input; i++) {
      let kotakMini = []
      for (let j = 0; j < this.input; j++) {
        let isi = Math.floor(Math.random() * huruf.length)
        kotakMini.push(huruf[isi])
      }
      kotak.push(kotakMini)
    }

    // let kotak = [
    //   ['T', 'G', 'H', 'I'], 
    //   ['K', 'L', 'P', 'S'],
    //   ['Y', 'E', 'U', 'T'],
    //   ['E', 'O', 'R', 'N']
    // ]

    return kotak
  }

  cek3X3(x, y, value) {
    let xMulai = x - 1
    let xAkhir = x + 1
    let yMulai = y - 1
    let yAkhir = y + 1

    if (xMulai < 0) {
      xMulai = 0
    }

    if (yMulai < 0) {
      yMulai = 0
    }

    if (xAkhir > 3) {
      xAkhir = 3
    }

    if (yAkhir > 3) {
      yAkhir = 3
    }

    for (let i = xMulai; i <= xAkhir; i++) {
      for (let j = yMulai; j <= yAkhir; j++) {
        if (this.copy[i][j] == value) {
          return [i, j]
        }
      }
    }
    return false
  }

  cekKata(pos, value) {
    let posisi = pos
    let cek = false

    for (let i = 0; i < value.length; i++) {
      if (this.cek3X3(posisi[0], posisi[1], value[i])) {
        posisi = this.cek3X3(posisi[0], posisi[1], value[i])
        this.copy[posisi[0]][posisi[1]] = ' '
      } else {
        cek = false
        return cek
      }
    }
    cek = true
    return cek
  }

  solve() {
    let board = this.board
    let kamus = this.book

    for (let i = 0; i < kamus.length; i++) { 
      for (let j = 0; j < board.length; j++) { 
        for (let k = 0; k < board[j].length; k++) { 
          this.copy = this.board.map(e => e.slice(0))
          if (board[j][k] == kamus[i][0]) {
            var cek = this.cekKata([j, k], kamus[i])
            this.copy[j][k] = ' '
          }
        }
      }
      if (cek) {
        this.kata.push(kamus[i])
      }
    }
    console.log(`${this.kata.length} kata ditemukan :\n${this.kata.join('\n')}`);
  }

}

let boggle = new Boggle(4);
console.log(boggle.board)
// boggle.shake();
boggle.solve();

// boggle.cek3X3(3, 3);
// console.log(boggle.shake(4));




