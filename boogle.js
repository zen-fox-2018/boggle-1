const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(size) {
    this.size = size
    this.kamus= ['SAYA','SUKA','CODING','BANK','JAVASCRIPT','DAN','TIDUR']
    this.board= [ [ 'B', 'A', 'B', 'P', 'I', 'R', 'A', 'Q', 'X', 'W' ],
                  [ 'K', 'N', 'I', 'N', 'T', 'R', 'A', 'E', 'R', 'E' ],
                  [ 'K', 'R', 'U', 'N', 'T', 'W', 'K', 'H', 'W', 'I' ],
                  [ 'G', 'C', 'S', 'I', 'F', 'X', 'Y', 'P', 'C', 'O' ],
                  [ 'I', 'A', 'S', 'V', 'O', 'V', 'K', 'U', 'K', 'T' ],
                  [ 'G', 'Y', 'F', 'A', 'V', 'J', 'S', 'A', 'P', 'Z' ],
                  [ 'L', 'A', 'D', 'A', 'A', 'S', 'J', 'J', 'I', 'E' ],
                  [ 'Z', 'E', 'A', 'O', 'Q', 'T', 'B', 'W', 'S', 'G' ],
                  [ 'H', 'U', 'O', 'Y', 'J', 'S', 'L', 'W', 'L', 'L' ],
                  [ 'D', 'G', 'Q', 'Z', 'U', 'N', 'M', 'O', 'R', 'H' ] ]
    this.tempKamus = []
  }
  checkKamus(stringDepan){
    for(let i = 0 ; i < this.kamus.length; i++){
      if(stringDepan == this.kamus[i][0]){
        this.tempKamus.push(this.kamus[i])
        if(this.kamus.length -1 == length) {
          return true
        }
      }
      
    }
   
    return false
  }
  chekKata(){
    
  }
  checkDalam(coorI,coorJ){
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        if( coorI + i >= this.size || coorJ + j >= this.size){
          return false
        }else{

        }
      }
    }
  }

  solve(){
    for(let i = 0 ; i < this.board.length; i++){
      let temp=''
      for(let j = 0; j < this.board[i].length; j++){
        if( this.checkKamus(this.board[i][j]) ) {
          temp += this.board[i][j]


        }
      }
    }
  }

  shake () {
    let  output = []
     for(let i = 0; i < this.size; i++) {
         let outputDalam = []
         this.tempKamus = []
         for(let j = 0; j < this.size; j++) {
              let randomString = String.fromCharCode(~~((Math.random() * 26 ) + 65))
              outputDalam.push(randomString)
         }
         output.push(outputDalam)
     }
 
     return output
 }

}

let boggle = new Boggle(10);
console.log(boggle.shake());
//boggle.solve();
