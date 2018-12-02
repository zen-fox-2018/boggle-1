const kamus = require('./data.js');

//value kamus bertipe object of array
//silakan di-console.log sendiri
//console.log(kamus.words)
class Boggle {
  constructor(size , kamus) {
    this.size = size
    this.board = this.shake()
    this.kamus = kamus.words
    this.size = 4
    // this.kamus= ['YOYO', 'SUSU', 'ANO', 'YAYA', 'SOSO']
    // this.board= [ [ 'A', 'K', 'A', 'A' ],
    //               [ 'S', 'A', 'B', 'A' ],
    //               [ 'U', 'A', 'A', 'T' ],
    //               [ 'A', 'C', 'S', 'A' ] ]
    
  }
/*
  Note : Maaf buat yang mengecheck gk tau caranya untuk mengirim array antara method tanpa merubah originalnya
  jadi method digabungin 
*/

  solve(){
    let hasilOutput = []  // Hasil Akhir yang akan ditampilkan
  
    for(let i = 0; i < this.kamus.length; i++){ // Looping Kamus
      let dummyBoard = this.board.map(function(x){ // Membuat dummy Board yang akan di reset ketika i++
        return x.slice(0)
      }) 
      let temp = []     // Menampung Semua Koor 
      let k = 0         // k digunakan untuk mencari index setelah huruf awal
      let cekKataPertama = this.kataPertama(this.kamus[i][0]) //cek Huruf Pertama  dari kamus ada di board
        if(cekKataPertama.length){  
            temp.push(cekKataPertama) //Menampung Koor kata pertama di board
        } else{
          temp = []
        }
          while(this.kamus[i][k+1] != undefined){ //Mencari kata selanjutnya ada di papan atau tidak
            if(!temp[k]){ 
              break 
            }
              for(let j = 0; j < temp[k].length; j ++){ 
                let coorITemp = temp[k][j][0]
                let coorJTemp = temp[k][j][1]
                dummyBoard[coorITemp][coorJTemp] = ' '   //Kata Pertama dikosongin di board
                  // console.log(temp,'Ini temp')
                  // console.log(k,'Ini current k')
                  // console.log(dummyBoard)
                  let hasil = []    // untuk menampung koordinat hasil cek grid nanti di push di temp
                  let coorAwal = [coorITemp -1 ,coorJTemp- 1] // mencari coor grid di sekitar target 
                  let coorAkhir = [coorITemp + 1, coorJTemp +1] // mencari coor grid di sekitar target 
                      if(coorAwal[0] < 0){ //Validasi atas bawah kiri kanan supaya tidak melebih dari border
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
                      for(let x = coorAwal[0]; x <= coorAkhir[0]; x++){ //Looping Grid
                        for(let m = coorAwal[1]; m <= coorAkhir[1]; m++){
                          if(dummyBoard[x][m] == this.kamus[i][k+1]){ // Validasi Grid
                            dummyBoard[x][m] = ' '  
                            hasil.push([x,m])
                          } 
                        }
                      }
                     // console.log(hasil,'Ini Coor hasil yang masuk ~~~~~')
                if(hasil.length){ // cek nilai dari hasil tadi yang didapatkan
                  temp.push(hasil)
                  break
                } else{
                  temp=[]
                  break
                } 
              }
          k++
        }

        if(temp.length){  // Jika temp berisi dan tidak di null in 
          hasilOutput.push(this.kamus[i])
          console.log(hasilOutput,'ini hasil')
        }
        console.log(i,'Ini STEP~~~~~~~~~~~~~~~~~~')
      }
    return hasilOutput
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
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

