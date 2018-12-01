class Boggle {
  constructor(size) {
    this.size = size
    this.kamus = require('./data.js').words
    this.board = []
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
    console.log(this.board)
  }

  solve() {
    let found = []
    let count = 0

    for (let i = 0; i < this.kamus.length; i++) {
      let coor = []
      let papan = JSON.parse(JSON.stringify(this.board))
      for (let j = 0; j < this.kamus[i].length; j++) {
        if ( j == 0) {
          let cekFirst = this.firstIdx(papan, this.kamus[i][j])
          if (cekFirst[0] == true ) {
            coor.push(cekFirst[1])
            papan[coor[0][0]][coor[0][1]] = ' '
            count++
          } else break
        } else {
          let cek2 = this.chekGrid(papan , this.kamus[i][j] , coor[coor.length -1]) 
          if (cek2[0] == true) {
            coor.push(cek2[1])
            papan[coor[coor.length - 1][0]][coor[coor.length - 1][1]] = ' '
            count++
          } else {
            coor = coor.slice(0 , coor.length - 1)
            j -=2
            count--
          }
        }
      }
      if (count == this.kamus[i].length) {
        found.push(this.kamus[i])
        count = 0
      }
    }      
    console.log(`${found.length} words found : \n${found.join('\n')}`)
  }

  firstIdx(board ,kamus) {
    let cond = false
    let coor = []

    board.forEach((arr ,i) => {
      arr.forEach((char , j) => {
        if(char == kamus) {
          cond = true
          coor.push(i,j)
        }    
      })
    });
    return [cond , coor]
  }

  chekGrid(board , kamus , coor) {
    let istart = coor[0] - 1
    let iend = coor[0] + 1
    let jstart = coor[1] - 1
    let jend = coor[1] + 1

    if (istart < 0) istart = 0
    else if (iend > board.length - 1) iend = board.length - 1
    else if (jstart < 0 ) jstart = 0
    else if (jend > board.length - 1) jend = board.length

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

let boggle = new Boggle(5);
boggle.shake()
boggle.solve();
// let arr = Array.apply(null, Array(4)).map(function() {
//   return new Array(9);
// });

