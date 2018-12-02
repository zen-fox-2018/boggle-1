const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boogle {
  constructor(number) {
    this.boogleSize = number
    this.shakeAwal = this.shake()
    this.dummyKamus = ["APPLE", "SIT", "TRIP", "TURN", "SUPER"]
    this.dummyShake = [
      ["D", "G", "H", "I"],
      ["K", "L", "P", "S"],
      ["Y", "E", "U", "T"],
      ["E", "O", "R", "N"]
    ]
    this.reset = JSON.parse(JSON.stringify(this.dummyShake))
    this.lokasiHurufAwal = []
    this.lokasiHurufBerikutnya = []    

  }

  shake() {
    let kotakLuar = []
    for (let i = 0; i < this.boogleSize; i++) {
      let kotakDalam = []
      for (let j = 0; j < this.boogleSize; j++) {
        let randomAngka = Math.floor(Math.random() * (90 - 65 + 1) + 65)
        let randomHuruf = String.fromCharCode(randomAngka)
        kotakDalam.push(randomHuruf)
      }
      kotakLuar.push(kotakDalam)
    }
    return kotakLuar
  }

  // untuk mengecek apakah huruf pertama ada pada array shake awal
  // untuk tes pertama pake dummyShake bukan shakeAwal dan
  // kamus pake dummyKamus bukan kamus
  cekAwal(kata) {
    for (let i = 0; i < this.dummyShake.length; i++) {
      for (let j = 0; j < this.dummyShake[i].length; j++) {
        if (kata[0] === this.dummyShake[i][j]) {
          let indeks = {}
          indeks['x'] = i
          indeks['y'] = j
          this.lokasiHurufAwal.push(indeks)
          return true
        }
      }
    }
    return false
  }

  //cek sambungan jika ketemu huruf pertama
  checkBoogle(abjad, indeks_i, indeks_j) {
    let start_a = indeks_i - 1
    if (start_a < 0) {
      start_a = 0
    }
    let end_a = indeks_i + 1
    if (end_a > this.dummyShake.length - 1) {
      end_a = this.dummyShake.length - 1
    }
    let start_b = indeks_j - 1
    if (start_b < 0) {
      start_b = 0
    }
    let end_b = indeks_j + 1
    if (end_b > this.dummyShake.length - 1) {
      end_b = this.dummyShake.length - 1
    }

    for (var a = start_a; a <= end_a; a++) {
      for (var b = start_b; b <= end_b; b++) {
        if (abjad === this.dummyShake[a][b]) {
          let indeks = {}
          indeks['x'] = a
          indeks['y'] = b
          this.lokasiHurufBerikutnya.push(indeks)
          return true
        }
      }
    }
    return false
  }

  //menggabungkan cekAwal dan cekBoogle
  ketemu(kata) {
    if (this.cekAwal(kata)) {
      for (let i = 0; i < this.lokasiHurufAwal.length; i++) {
        this.lokasiHurufBerikutnya = []
        this.lokasiHurufBerikutnya.push(this.lokasiHurufAwal[i])
        // console.log(this.lokasiHurufBerikutnya)
        for (let j = 1; j < kata.length; j++) {
          if (this.lokasiHurufBerikutnya.length === 0) {
            return false
          }
          let indeksTerakhir = this.lokasiHurufBerikutnya.length - 1
          let x = this.lokasiHurufBerikutnya[indeksTerakhir]['x']
          let y = this.lokasiHurufBerikutnya[indeksTerakhir]['y']
          // console.log(x, y)
          this.dummyShake[x][y] = "empty"
          if (this.checkBoogle(kata[j], x, y) === false) {
            this.lokasiHurufBerikutnya.splice(-1, 1)
            j = j - 2
          }
        }
      }
    }
    else if (this.cekAwal(kata) === false) {
      return false
    }
    return true
  }

  solve() {
    let jumlahKetemu = 0
    let hasil = []
    for (let i = 0; i < this.dummyKamus.length; i++) {
      this.dummyShake = JSON.parse(JSON.stringify(this.reset))
      this.lokasiHurufAwal = []
      if (this.ketemu(this.dummyKamus[i])) {
        hasil.push(this.dummyKamus[i])
        jumlahKetemu++
      }
    }
    return console.log(`${jumlahKetemu} word(s) found\n${hasil.join(', \n')}`)
  }



}

let boogle = new Boogle(4);
// boogle.shake();
// console.log(boogle.dummyShake)
// console.log(boogle.dummyKamus[4])
// console.log(boogle.cekAwal(boogle.dummyKamus[4]))
// console.log(boogle.checkBoogle('U', 1 , 3))
// console.log(boogle.ketemu(boogle.dummyKamus[4]))

console.log(boogle.dummyShake)
boogle.solve();
// console.log(boogle)
// console.log(boogle.cekAwal('TURN'))
// console.log(boogle.checkBoogle('U', 2, 3))

// boogle.solve();


// var dummyShake = [
//         ["D","G","H","I"],
//         ["K","L","P","S"],
//         ["Y","E","U","T"],
//         ["E","O","R","N"]
//       ]

// console.log(dummyShake[3][4])