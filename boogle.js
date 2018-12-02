


class Boogle {

  constructor(num) {
    this.board = this.board()
    this.dictionary = {words : ['COBA', 'BAD', 'SASA', 'PAPA']}
  }

  // board(num) {
  // let row = []
  // let kamus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  //     for(let i = 0; i < num; i++){
  //     let col = []
  //         for(let j = 0; j < num; j++){
  //             let k = Math.floor(Math.random()*25)
  //             col.push(kamus[k])
  //         }
  //     row.push(col)
  //     }
  //     return row
  // }

  board() {
      let row = [
          [ 'C', 'A', 'D', 'M' ],
          [ 'O', 'B', 'W', 'K' ],
          [ 'S', 'A', 'S', 'A' ],
          [ 'A', 'D', 'R', 'T' ] ]
      return row
  }


  solve() {
      let board = this.board
      let sth = []
      for(let i = 0; i < board.length; i++) {
          for(let j = 0; j < board[i].length; j++) {
              let str = board[i][j]
                  while (this.checkAddLetter(str) === true) {
                      i = this.addHorizontal1(i,j)[0]
                      j = this.addHorizontal1(i,j)[1]
                      if(board[i][j] === undefined){
                          break
                      }
                      str+= board[i][j]    
                  }
                  sth.push(str)
          }
      }
      
      let result = []
      for(let i = 0; i < sth.length; i++) {
          for(let j = 0; j < this.dictionary.words.length; j++){
              if(sth[i] === this.dictionary.words[j]){
                  result.push(sth[i])
              }
          }
      }
      return result
  }


  checkAddLetter(newStr) {
      let dict = []
      for(let i = 0; i < this.dictionary.words.length; i++) {
          let temp = ''
          for(let j = 0; j < newStr.length; j++) {
              temp+= this.dictionary.words[i][j]
          }
          dict.push(temp)
      }
      for(let i = 0; i < dict.length; i++) {
          if(dict[i] === newStr) {
              return true
          }
      }
      return false
    }
  


  addHorizontal1(row, col) {

      let index = [row, col+1]
      return index
  }

  
}

let boogle = new Boogle();
// boggle.shake();
//   boogle.solve();
console.log(boogle.solve());


