document.addEventListener('DOMContentLoaded', () => {
    const boardDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let board = []
    let score = 0

    //create board
    function make_2048_Board(){
        for(let i=0; i<width*width; i++){
            singleSquare = document.createElement('div')
            singleSquare.innerHTML = 0
            boardDisplay.appendChild(singleSquare)
            board.push(singleSquare)
        }
        generate()
        generate()
    }
    make_2048_Board()

    //generate random number
    function generate(){
        let randomNumber = Math.floor(Math.random() * board.length)
        if(board[randomNumber].innerHTML == 0){
            board[randomNumber].innerHTML = 2;
            checkforLose()
        }
        else generate()
    }

    //move to right
    function pushRight(){
        for(i=0;i<16;i++){
            if( i%4 === 0){
                let firstElement = board[i].innerHTML
                let secondElement = board[i+1].innerHTML
                let thirdElement = board[i+2].innerHTML
                let fourthElement = board[i+3].innerHTML
                let row = [parseInt(firstElement),parseInt(secondElement),parseInt(thirdElement),parseInt(fourthElement)]

                let nonZeroRowElements = row.filter(num => num)
                let remainingSquares = 4 - nonZeroRowElements.length
                let zeros = Array(remainingSquares).fill(0)
                let newRow = zeros.concat(nonZeroRowElements)

                board[i].innerHTML = newRow[0]
                board[i+1].innerHTML = newRow[1]
                board[i+2].innerHTML = newRow[2]
                board[i+3].innerHTML = newRow[3]
            }
        }
    }


    //move to left
    function pushLeft(){
        for(i=0;i<16;i++){
            if( i%4 === 0){
                let firstElement = board[i].innerHTML
                let secondElement = board[i+1].innerHTML
                let thirdElement = board[i+2].innerHTML
                let fourthElement = board[i+3].innerHTML
                let row = [parseInt(firstElement),parseInt(secondElement),parseInt(thirdElement),parseInt(fourthElement)]

                let nonZeroRowElements = row.filter(num => num)
                let remainingSquares = 4 - nonZeroRowElements.length
                let zeros = Array(remainingSquares).fill(0)
                let newRow = nonZeroRowElements.concat(zeros)

                board[i].innerHTML = newRow[0]
                board[i+1].innerHTML = newRow[1]
                board[i+2].innerHTML = newRow[2]
                board[i+3].innerHTML = newRow[3]
            }
        }
    }

    //move down 
    function pushDown() {
        for(i=0;i<4;i++){
            let firstElement = board[i].innerHTML
            let secondElement = board[i+width].innerHTML
            let thirdElement = board[i+(width*2)].innerHTML
            let fourthElement = board[i+(width*3)].innerHTML
            let column = [parseInt(firstElement),parseInt(secondElement),parseInt(thirdElement),parseInt(fourthElement)]

            let nonZeroColumnElements = column.filter(num => num)
            let remainingSquares = 4 - nonZeroColumnElements.length
            let zeros = Array(remainingSquares).fill(0)
            let newColumn = zeros.concat(nonZeroColumnElements)

            board[i].innerHTML = newColumn[0]
            board[i+width].innerHTML = newColumn[1]
            board[i+(width*2)].innerHTML = newColumn[2]
            board[i+(width*3)].innerHTML = newColumn[3]
        }
    }

    //move down 
    function pushUp() {
        for(i=0;i<4;i++){
            let firstElement = board[i].innerHTML
            let secondElement = board[i+width].innerHTML
            let thirdElement = board[i+(width*2)].innerHTML
            let fourthElement = board[i+(width*3)].innerHTML
            let column = [parseInt(firstElement),parseInt(secondElement),parseInt(thirdElement),parseInt(fourthElement)]

            let nonZeroColumnElements = column.filter(num => num)
            let remainingSquares = 4 - nonZeroColumnElements.length
            let zeros = Array(remainingSquares).fill(0)
            let newColumn = nonZeroColumnElements.concat(zeros)

            board[i].innerHTML = newColumn[0]
            board[i+width].innerHTML = newColumn[1]
            board[i+(width*2)].innerHTML = newColumn[2]
            board[i+(width*3)].innerHTML = newColumn[3]
        }
    }

    //to combine rows
    function addRows(){
        for(let i=0;i<15;i++){
            if(board[i].innerHTML === board[i+1].innerHTML){
                let Total = parseInt(board[i].innerHTML) + parseInt(board[i+1].innerHTML)
                board[i].innerHTML = Total
                board[i+1].innerHTML = 0
                score+= Total
                scoreDisplay.innerHTML = score
            }
        }
        checkforWin()
    }

    //to combine columns
    function addColumns(){
        for(let i=0;i<12;i++){
            if(board[i].innerHTML === board[i+width].innerHTML){
                let Total = parseInt(board[i].innerHTML) + parseInt(board[i+width].innerHTML)
                board[i].innerHTML = Total
                board[i+width].innerHTML = 0
                score += Total
                scoreDisplay.innerHTML = score
            }
        }
        checkforWin()
    }

    // Let them work with keys
    function control(e){
        if(e.keyCode === 39){
            moveRight()
        }
        else if(e.keyCode === 37){
            moveLeft()
        }
        else if(e.keyCode === 40){
            moveDown()
        }
        else if(e.keyCode === 38){
            moveUp()
        }
    }
    document.addEventListener('keyup',control)

    function moveRight(){
        pushRight()
        addRows()
        pushRight()
        generate()
    }
    function moveLeft(){
        pushLeft()
        addRows()
        pushLeft()
        generate()
    }
    function moveDown(){
        pushDown()
        addColumns()
        pushDown()
        generate()
    }
    function moveUp(){
        pushUp()
        addColumns()
        pushUp()
        generate()
    }

    //check for win
    function checkforWin(){
        for(let i = 0; i < board.length; i++) {
            if(board[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Won 🥳🥳'
                document.removeEventListener('keyup',control)
            }
        }
    }

    //check if lost
    function checkforLose(){
        let zeros = 0
        for(let i = 0; i < board.length;i++){
            if(board[i].innerHTML == 0){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML = "You Lost 🥺🥺"
            document.removeEventListener('keyup',control)
        }
    }

    //clear timer
    function clear() {
        clearInterval(myTimer)
    }

    function addColours() {
        for (let i=0; i < board.length; i++) {
          if (board[i].innerHTML == 0) board[i].style.backgroundColor = '#afa192'
          else if (board[i].innerHTML == 2) board[i].style.backgroundColor = '#e94848'
          else if (board[i].innerHTML  == 4) board[i].style.backgroundColor = '#053a41f3' 
          else if (board[i].innerHTML  == 8) board[i].style.backgroundColor = '#cf8e16' 
          else if (board[i].innerHTML  == 16) board[i].style.backgroundColor = '#213613' 
          else if (board[i].innerHTML  == 32) board[i].style.backgroundColor = '#7328b1' 
          else if (board[i].innerHTML == 64) board[i].style.backgroundColor = '#580505' 
          else if (board[i].innerHTML == 128) board[i].style.backgroundColor = '#031347' 
          else if (board[i].innerHTML == 256) board[i].style.backgroundColor = '#ff3300' 
          else if (board[i].innerHTML == 512) board[i].style.backgroundColor = '#190333f3' 
          else if (board[i].innerHTML == 1024) board[i].style.backgroundColor = '#fbff00' 
          else if (board[i].innerHTML == 2048) board[i].style.backgroundColor = '#beeaa5' 
        }
    }
    addColours()
    
    var myTimer = setInterval(addColours, 50)
})