const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
//console.log(kamus.words)
class Boggle {
  constructor(size , kamus) {
    this.size = size
    this.board = this.shake()
    this.kamus = kamus.words
    // this.size = 4
    // this.kamus= ['YOYO', 'SUSU', 'ANO', 'YAYA', 'SOSO']
    // this.board= [ [ 'I', 'A', 'Y', 'O' ],
    //               [ 'D', 'N', 'S', 'S' ],
    //               [ 'O', 'U', 'S', 'N' ],
    //               [ 'A', 'C', 'S', 'C' ] ]
   
    
  }


  solve(){
    let hasil = []
    for(let i = 0; i < this.kamus.length; i++){
      if(this.cekKamus(this.kamus[i]).length){
        hasil.push(this.kamus[i])
        console.log(hasil,'ini hasil')
      }
    }
    return hasil
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  cekKamus(kataKamus){
    let temp = []
    let k = 0
    let dummyBoard = this.board.map(function(x){
      return x.slice(0)
    })
    let cekKataPertama = this.kataPertama(kataKamus[0])
    if(cekKataPertama.length){

      temp.push(cekKataPertama)
    } else{
      return []
    }
    while(kataKamus[k+1] != undefined){ //Mencari kata selanjutnya ada di papan atau tidak
     if(!temp[k]){
     
       return []
     }
      for(let i = 0; i < temp[k].length; i ++){
        let coorITemp = temp[k][i][0]
        let coorJTemp = temp[k][i][1]
        dummyBoard[coorITemp][coorJTemp] = ' '   
          console.log(temp,'Ini temp')
          console.log(k,'Ini current k')
          console.log(dummyBoard)
        let check = this.cekDalam([coorITemp,coorJTemp],kataKamus[k+1], dummyBoard)
        if(check.length){
          temp.push(check)
          break  
        } else{
          return []
        }
      }
    
      k++
    }
    return temp
  }

  cekDalam(coorIndex , string , papan){
    let hasil = []
    let coorAwal = [coorIndex[0] -1 ,coorIndex[1] - 1]
    let coorAkhir = [coorIndex[0] + 1, coorIndex[1] +1]
    if(coorAwal[0] < 0){
      coorAwal[0] = 0
    }
    if(coorAwal[1] < 0){
      coorAwal[1] = 0
    }
    if(coorAkhir[0] >= this.size ){
      coorAkhir[0] = this.size - 1
    }
    if(coorAkhir[1] >= this.size  ){
      coorAkhir[1] = this.size - 1
    }
    for(let i = coorAwal[0]; i <= coorAkhir[0]; i++){
      for(let j = coorAwal[1]; j <= coorAkhir[1]; j++){
        if(papan[i][j] == string){
          hasil.push([i,j])
        }
      }
    }
    // console.log(hasil,'Ini Coor hasil yang masuk ~~~~~')
    return hasil
  }

  kataPertama(string){
    let arrayFirst=[]
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board[i].length; j++){
        if(this.board[i][j] === string){
          arrayFirst.push([i,j])
        }
      }
    }
    return arrayFirst
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

let boggle = new Boggle(8 , kamus);
//console.log(boggle.shake());

console.log(boggle.solve());
console.log(boggle.board)


console.log(boggle.kataPertama('S').slice(1))

