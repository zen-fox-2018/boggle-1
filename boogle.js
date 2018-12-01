const kamus = require('./data.js');
const kamusDummy = ['APPLE', 'SIT' , 'TRIP' ,'TURN' , 'SUPER']

class Boggle {
  constructor(size) {
    this.size = size
    this.kamus = ['APPLE', 'SIT' , 'TRIP' ,'TURN' , 'SUPER']
    //ingat ubah balik boardnya jadi array kosong!
    this.board = [['D', 'G', 'H' ,'I'], [ 'K' ,'L' ,'P' ,'S'], [ 'Y' ,'E' ,'U' ,'T'] , [ 'E' ,'O' ,'R' ,'N']]
  }

  shake(){
    let abzad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < this.size; i++) {
      let temp = []
      for (let j = 0; j < this.size; j++) {
        temp.push(abzad[Math.floor(Math.random() * abzad.length)])
      }
      this.board.push(temp)
    }
    return this.board
  }

  solve() {
    let found = []
    let count = 0

    for (let i = 0; i < this.kamus.length; i++) {
      let coor = []
      for (let j = 0; j < this.kamus[i].length; j++) {
        if ( j == 0) {
          let cekFirst = this.firstIdx(this.kamus[i][j])
          if (cekFirst[0] == true ) {
            console.log('masukkk first')
            coor.push(cekFirst[1])
            this.board[coor[0][0]][coor[0][1]] = ' '
            count++
          } else {
            break
          }
        } else {
          let cek2 = this.chekGrid(this.board , this.kamus[i][j] , coor[coor.length -1]) 
          if (cek2[0] == true) {
            console.log('masukkk seccc')
            coor.push(cek2[1])
            this.board[coor[coor.length - 1][0]][coor[coor.length - 1][1]] = ' '
            count++
          } else {
            console.log('g ketemu')
            coor = coor.slice(0 , coor.length - 1)
            count--
            j -=2
          }
        }
      }
      if (count == this.kamus[i].length) {
        found.push(this.kamus[i])
        count = 0
      }
    }
    console.log(this.board)
      
    console.log(`${found.length} words found : `)
    console.log(found.join('\n'))
  }

  firstIdx(kamus) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] == kamus) {
          return [true,[i,j]]
        }         
      }
      
    }
    return [false]
  }

  chekGrid(board , kamus , coor) {
    let istart = coor[0] - 1
    let iend = coor[0] + 1
    let jstart = coor[1] - 1
    let jend = coor[1] + 1

    if (istart < 0) {
      istart = 0
    } else if (iend > board.length - 1) {
      iend = board.length - 1
    } else if (jstart < 0 ) {
      jstart = 0
    } else if (jend > board.length - 1) {
      jend = board.length
    }

    for (let i = istart; i <= iend; i++) {
      for (let j = jstart; j <= jend; j++) {
        if (board[i][j] == kamus ) {
          return [true , [i ,j]]
        }
      }      
    }
    return [false]
  }

}

let boggle = new Boggle(4);

// let arr = Array.apply(null, Array(4)).map(function() {
//   return new Array(9);
// });
// console.log(boggle.shake())
console.log(boggle.board)
boggle.solve();

