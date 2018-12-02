const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri

class Boggle {
  constructor(num) {
    this.shake = num
    this.isBoard =    [ 
    [ 'D', 'E', 'H', 'I' ],
    [ 'K', 'L', 'P', 'S' ],
    [ 'Y', 'E', 'U', 'T' ],
    [ 'E', 'O', 'R', 'N' ] ]
    this.kamus = ['PUT', 'HELP', 'SUPER','TURN', 'SIT', 'APPLE']
    this.coordinate = this.firstLetterPos()
  } 
    checkWordInisial(letter){
      for(let i = 0; i<this.kamus.length; i++){
        if(letter === this.kamus[i][0]){
          return true
        }
      }
    }
       

    


    firstLetterPos(){
      let result = []
      
      for (let i = 0; i < this.isBoard.length; i++){
        let obj = {}
        let cekOBj = false
        for(let j = 0; j < this.isBoard[i].length; j++){
         if(this.checkWordInisial(this.isBoard[i][j])){
           obj.x = i
           obj.y = j     
           result.push(obj) 
          }         
         }        
        }
      return result
    }

    cekBlok(col, row, letter) {
      let cek = false
     let col = Math.floor(col/3)*3
     let row = Math.floor(col/3)*3

       for (let n = col; n < col + 3; n++) {
          for(let o = row; o < row +3; o++) {
              if(letter === this.isBoard[n][o]){
                  return true
              }
              else {
                return false
              }
          }
        
       }
    
    }


    solve(){
      let tampung = ''
      for(let i = 0; i < this.kamus.length; i++){
        for(let j = 0; j < this.kamus[i].length; j++){
          for(let k = 0; k < this.coordinate.length; k++){  
            let holderX = this.coordinate[k].x
            let holderY = this.coordinate[k].y
            if( this.kamus[i][0] === this.isBoard[holderX][holderY])  {
              console.log('cakep')
              if(this.cekBlok(holderX,holderY,this.kamus[i][j+1])){
                console.log('cakep')
              }

                                                                            // tampung += this.kamus[i][0]
                                                                            // if(this.kamus[i][j+1] === this.isBoard[this.coordinate[k].x][this.coordinate[k].y-1]){
                                                                            //   tampung += this.kamus[i][j+1]
                                                                            //   holderX = this.coordinate[k].x
                                                                            //   holderY = this.coordinate[k].y-1
                                                                            //   if(this.kamus[i][j+2] === this.isBoard[holderX+1][holderY]){
                                                                            //     tampung += this.kamus[i][j+2]
                                                                            // //    console.log('masih benar')
                                                                            //   }
                                                                              
                                                                            // }
            
          }     
        }
      } return tampung
    }
   // solve()
  }

} // class edge

var boggle = new Boggle(4);
//console.log(boggle.firstLetterPos());
console.log(boggle.solve());
