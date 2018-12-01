const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
//console.log(kamus.words)
class Boggle {
  constructor(size , kamus) {
    this.size = size
    this.kamus = kamus.words
    // this.kamus= ['SAYA','SUKA','CODING','BANK','BCA','JAVASCRIPT','DAN','TIDUR']
    // this.board= [ [ 'B', 'A', 'B', 'P', 'I', 'R', 'A', 'Q', 'X', 'W' ],
    //               [ 'K', 'N', 'I', 'N', 'T', 'R', 'A', 'E', 'R', 'E' ],
    //               [ 'K', 'R', 'U', 'N', 'T', 'W', 'K', 'H', 'W', 'I' ],
    //               [ 'G', 'C', 'S', 'I', 'F', 'X', 'Y', 'P', 'C', 'O' ],
    //               [ 'I', 'A', 'S', 'V', 'O', 'V', 'K', 'U', 'K', 'T' ],
    //               [ 'G', 'Y', 'F', 'A', 'V', 'J', 'S', 'A', 'P', 'Z' ],
    //               [ 'L', 'A', 'D', 'V', 'A', 'S', 'J', 'J', 'Y', 'E' ],
    //               [ 'Z', 'E', 'A', 'A', 'Q', 'T', 'B', 'S', 'S', 'G' ],
    //               [ 'H', 'U', 'O', 'Y', 'J', 'S', 'L', 'W', 'L', 'L' ],
    //               [ 'D', 'G', 'Q', 'Z', 'U', 'N', 'M', 'O', 'R', 'H' ] ]
    this.board = this.shake()
    this.tempKamus = []
    this.tempI = 0
    this.tempJ = 0
    this.tempStr = ''
    this.findKamus = {}
  }
  checkKamus(stringDepan){ //ini cek depannya saja
    for(let i = 0 ; i < this.kamus.length; i++){
      if(stringDepan == this.kamus[i][0]){
        this.tempKamus.push(this.kamus[i])
        
      }else if(this.tempKamus && this.kamus.length -1 == i){
      //  console.log('Masuk')
        return true
      }
      
    }
    
    return false
  }
  chekKata(countNow , string){
    
    for(let i = 0; i < this.tempKamus.length; i++){
       
        if(this.tempKamus[i][countNow] == string){
          return true
        
      }
    }
    return false
  }
 checkAllKata(){
   for(let i = 0; i < this.tempKamus.length; i++) {

       if(this.tempKamus[i].slice(0,this.tempStr.length) == this.tempStr) {
         return true
       }
     
   }
   return false
 }

  checkDalam(coorI,coorJ,k){
        
          if(coorI - 1 >= 0 && this.chekKata(k , this.board[coorI - 1][coorJ])  && this.checkAllKata()){
            this.tempI = coorI - 1
            this.tempJ = coorJ
            this.tempStr += this.board[coorI - 1][coorJ]
            return true
          } else if(coorI - 1 >= 0 && coorJ + 1 < this.size && this.chekKata(k , this.board[coorI - 1][coorJ + 1]) && this.checkAllKata() ){
            this.tempI = coorI - 1
            this.tempJ = coorJ + 1
            this.tempStr +=  this.board[coorI - 1][coorJ + 1]
            return true
          }  else if(coorJ + 1 < this.size  && this.chekKata(k , this.board[coorI][coorJ + 1]) && this.checkAllKata() )  {
            this.tempI = coorI 
            this.tempJ = coorJ + 1
            this.tempStr +=  this.board[coorI][coorJ + 1]
            return true
          } else if ( coorI + 1 < this.size && coorJ + 1 < this.size && this.chekKata(k, this.board[coorI + 1][coorJ + 1])  && this.checkAllKata() ) {
            this.tempI = coorI + 1
            this.tempJ = coorJ + 1
            this.tempStr +=  this.board[coorI + 1][coorJ + 1]
            return true
          } else if( coorI + 1 < this.size  && this.chekKata(k , this.board [coorI + 1][coorJ]) && this.checkAllKata() ){
            this.tempI = coorI + 1
            this.tempJ = coorJ 
            this.tempStr +=  this.board[coorI + 1][coorJ]
            return true
          } else if(coorJ - 1 >= 0 && coorI + 1 < this.size && this.chekKata(k, this.board[coorI + 1][coorJ - 1]) && this.checkAllKata() ){
            this.tempI = coorI + 1
            this.tempJ = coorJ - 1
            this.tempStr +=  this.board[coorI + 1][coorJ - 1]
            return true
          } else if(coorJ - 1 >= 0 && this.chekKata(k , this.board [coorI][coorJ - 1]) && this.checkAllKata() ){
            this.tempI = coorI
            this.tempJ = coorJ - 1
            this.tempStr +=  this.board[coorI][coorJ - 1]
            return true
          } else if(coorI - 1 >= 0 && coorJ - 1 >= 0 && this.chekKata(k, this.board[coorI - 1][coorJ - 1])  && this.checkAllKata() ){
            this.tempI = coorI - 1
            this.tempJ = coorJ - 1
            this.tempStr +=  this.board[coorI - 1][coorJ - 1]
            return true
          }  
          // else if( coorI + 1 < this.size && coorJ - 1 >= 0 && this.chekKata(k , this.board [coorI + 1][coorJ - 1]) ){
          //   this.tempI = coorI + 1
          //   this.tempJ = coorJ - 1 
          //   this.tempStr +=  this.board[coorI + 1][coorJ - 1]
          //   return true
          // }
          else {
            this.tempI = 0
            this.tempJ = 0
            return false
          }
        
  }
  checkFound(){
    for(let i = 0; i < this.tempKamus.length; i++){
      if(this.tempStr == this.tempKamus[i]){
        return true
      }
    }
  }
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  

  solve(){
    
    for(let i = 0 ; i < this.board.length; i++){
      this.tempStr=''
      let k = 1
      this.tempKamus = []
      this.tempI=0
      this.tempJ=0
      for(let j = 0; j < this.board[i].length; j++){
        this.tempI = i
          this.tempJ = j
        if( this.checkKamus(this.board[i][j]) ) {
          
          this.tempStr += this.board[i][j]
         // console.log(`Masuk di IF 1~~~~Ini I dan j ${this.tempI} ${this.tempJ} ini temp str ${this.tempStr}`)
          while(true){
            //  console.log(`Ini I dan j ${this.tempI} ${this.tempJ} ini temp str ${this.tempStr} 
            // Dalam While
            // // Cek K di posisi ${k}
            // // ini Current hasil ${Object.getOwnPropertyNames(this.findKamus)}`)
            // // this.sleep(100)
            if(this.checkDalam(this.tempI,this.tempJ,k)){
              if(this.checkFound()){
              //  console.log('~~masuk')
                if(!this.findKamus[this.tempStr]){
                  this.findKamus[this.tempStr] = 0
                }
                this.tempI = 0
                this.tempJ = 0
                this.tempStr = ''
                this.tempKamus = []
                break
              }
              k++
            } else{
                this.tempI = 0
                this.tempJ = 0
                this.tempStr = ''
                this.tempKamus = []
                k=1
                break
            }

          }
        }
      }
    }
    return Object.getOwnPropertyNames(this.findKamus)
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

let boggle = new Boggle(10 , kamus);
//console.log(boggle.shake());
console.log(boggle.board)
console.log(boggle.solve());
// string = 'sdssdsa'
// console.log(string.slice(0,2))

