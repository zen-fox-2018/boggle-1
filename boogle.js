const kamus = require('./data.js');
// console.log(kamus)
//value kamus bertipe object of array
//silakan di-console.log sendiri
const dummy = {words:["APPLE","SUGAR","BOBO"]}
const BOARD = [["A","P","L","E","L"],
               ["S","P","K","O","E"],
               ["U","G","T","P","O"],
               ["A","R","H","B","Y"]]
class Boggle{
  constructor(num){
      this.dictionary = kamus.words
      this.boggleBoard = this.shake(num)
  }

  shake(num) {
      let board = []
      const abjad = "ABCDEGHIJKLMNOPQRSTUVWXYZ"
      for (let i = 0 ; i < num ; i++) {
        let baris = []
        for (let j = 0 ; j < num ; j++) {
          let random = Math.floor(Math.random()* abjad.length)
          baris.push(abjad[random])
        }
        board.push(baris)
      }
      return board
    }

  solve() {
      var found = []
      for ( let i = 0 ; i < this.dictionary.length; i++ ) {
          let wordFound = this.findWords(this.dictionary[i])   
          if ( wordFound ) {
              found.push(this.dictionary[i])
          }
      }
      console.log( this.boggleBoard )
      if (found.length === 0) {
          console.log("word not found")
      } else {
          console.log(` ${found.length -1} words are found` )
          console.log(found.join(','))
      }
  }

  findWords(dictionary) {
      let findHurufAwal = this.findHuruf( this.boggleBoard.length, this.boggleBoard.length, dictionary[0] )
      while( findHurufAwal.length > 0 ) {
          let copy = JSON.parse(JSON.stringify(this.boggleBoard))
          let arr = dictionary.split('')      
          let isfound = this.checkGrid(findHurufAwal[0][0], findHurufAwal[0][1], copy, arr )
          if ( isfound ) {    
              return true
          } else {
              findHurufAwal.shift()
          }
      } 
      return false    
  }    

  checkGrid (X, Y, Board, Word) {
      if ( Board[X][Y] !== Word[0] )  {
          return false
      }
      if ( Board[X][Y] === Word[0] && Word.length > 1 ) {
          Board[X][Y] = ' '
          Word.shift()
      }
      if ( Board[X][Y] === Word[0] && Word.length === 1 ) {
          Board[X][Y] = ' '
          return true
      }      
      let XStart = X - 1 
      let XEnd = X + 1
      let YStart = Y - 1 
      let YEnd = Y + 1

      if(XStart < 0 ){
          XStart = 0
      }
      if( XEnd > this.boggleBoard.length-1 ){
          XEnd = this.boggleBoard.length-1
      }
      if(  YStart < 0 ){
          YStart = 0
      }
      if( YEnd > this.boggleBoard.length-1 ){

          YEnd = this.boggleBoard.length -1
      }
      for ( let i = XStart; i <= XEnd; i++ ) {
          for ( let j = YStart ; j <= YEnd ; j++) {            
              if (Word[0] === Board[i][j]) {
                  return this.checkGrid(i, j, Board, Word)
              }
          }
      }
      return false
  }

  findHuruf(X, Y, huruf){
      let arr = []
      for (let i = 0; i < X ; i++ ) {
          let temp = []
          for (let j = 0; j < Y; j++) {
              if (this.boggleBoard[i][j] === huruf ) {
                  temp.push(i,j)
                  arr.push(temp)
              }
          } 
      }        
      return arr
  }
  
}

let boggle = new Boggle(4);
boggle.shake();
// boggle.checkhuruf("A",0,3)
// console.log(boggle.dummy)
boggle.solve();
