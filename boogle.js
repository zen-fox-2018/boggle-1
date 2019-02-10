
const kamus = require('./data.js');

class Boogle {

    constructor(num) {
      this.num = num
      this.board = this.board(num)
      this.dictionary = kamus.words
     
    }
  
    board(num) {
    let row = []
    let kamus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for(let i = 0; i < num; i++){
        let col = []
            for(let j = 0; j < num; j++){
                let k = Math.floor(Math.random()*26)
                col.push(kamus[k])
            }
        row.push(col)
        }
        return row
    }
    // board() {
    //     let row = [
    //         [ 'C', 'A', 'D', 'M' ],
    //         [ 'O', 'B', 'W', 'P' ],
    //         [ 'S', 'A', 'S', 'A' ],
    //         [ 'A', 'D', 'A', 'P' ] ]
    //     return row
    // }
    
    solve() {
        let count = 0
        let arr = []
        for(let i = 0; i < this.dictionary.length; i++) {
            if(this.checkFirstLetter(this.dictionary[i][0], this.dictionary[i]) === true) {
                count++
                arr.push(this.dictionary[i])
            }
        }
        console.log (this.board)
        return ` ${count} words found : ${arr}`
    }

    checkFirstLetter (firstLetter, str) {
        for(let i = 0; i < this.board.length; i++) {
            for(let j = 0; j < this.board.length; j++) {
                if(firstLetter === this.board[i][j] && this.checkGrid(i,j,str) ===true) {
                    return true
                }
            }
        }
        return false
    }

    checkGrid (row, col, str) {
        let visitedList = [[row,col]]
        let rowStart = row - 1
        let rowEnd = row + 1
        let colStart = col - 1
        let colEnd = col + 1

        if(rowStart < 0) {
            rowStart = 0
        }
        if(rowEnd > this.num) {
            rowEnd = this.num
        }
        if(colStart < 0) {
            colStart = 0
        }
        if(colEnd > this.num) {
            colEnd = 0
        }

        let k = 1
        while (k < str.length){
            let isFound = false
            for(let i = rowStart; i < rowEnd; i++) {
                for(let j = colStart; j < colEnd; j++) {
                    if(this.board[i][j] === str[k] && this.visited(visitedList, i, j) === false) {
                        visitedList.push([i,j])  
                        rowStart = row - 1
                        rowEnd = row + 1
                        colStart = col - 1
                        colEnd = col + 1
                        if(rowStart < 0) {
                            rowStart = 0
                        }
                        if(rowEnd > this.num) {
                            rowEnd = this.num
                        }
                        if(colStart < 0) {
                            colStart = 0
                        }
                        if(colEnd > this.num) {
                            colEnd = 0
                        }
                    
                        isFound = true
                        break

                    }
                }
                if(isFound == true) {
                    k++
                    break
                }
            }
        
           
            if(isFound == false) {
                return false
            }
        }
        
        return true
    }

    visited (visitedList, row, col) {
        for(let i = 0; i < visitedList.length; i++) {
            if(row === visitedList[i][0]&& col === visitedList[i][1]) {
                return true
            }
        }
        return false
    }
  }
  
  let boogle = new Boogle(4);
  // boggle.shake();
//   boogle.solve();
// console.log(boogle.dictionary[0]);

// console.log(boogle.board)

  console.log(boogle.solve());
//   console.log(boogle.checkVisited([[1,2]],1,2));
//   console.log((boogle.checkGrid(0,0,'COBA')));
  
//   console.log(boogle.firsHistory);
  

