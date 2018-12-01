let fs = require(`fs`)

class Boggle {
    constructor() {
        this.words = fs.readFileSync(`./text.txt`, `utf8`)
        this.newWords = []
        this.board = this.makeBoard()
    }

    //FUNCTION INI MENGENERATE KBBI
    makeWords() {
        let temp = ``
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i] == `\n`) {
                this.newWords.push(temp)
                temp = ``
            }
            temp += this.words[i]
        }

        for (let i = 0; i < this.newWords.length; i++) {
            this.newWords[i] = this.newWords[i].slice(1)
            this.newWords[i] = this.newWords[i].toUpperCase()
        }
        return this.board
        return this.newWords
    }

    //BUAT BOARD DENGAN ALPHABET RANDOM
    makeBoard() {
        const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
        const limit = 10
        let boardResult = []

        for (let i = 0; i < limit; i++) {
            let boardTemp = []
            for (let j = 0; j < limit; j++) {
                boardTemp.push(alphabet[Math.floor(Math.random() * alphabet.length)])
            }
            boardResult.push(boardTemp)
        }
        return boardResult
    }

    solve() {
        this.makeWords()
        this.makeBoard()

        

    }
}

let game = new Boggle()
console.log(game.solve());
