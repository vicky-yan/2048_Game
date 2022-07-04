document.addEventListener('DOMContentLoaded',()=> {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
    
    //create a playing board;
    function createBoard(){
        for(let i = 0; i < width*width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)

        }
        generate()
        generate()
    }
    createBoard()

    //generate a number randomly
    function generate(){
        let randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
            checkForLose()
        } else generate()

    }

    //swipe right
    function moveRight(){
        for(let i = 0; i< 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                //console.log(row)

                let filterredRow = row.filter(num => num)
                //console.log(filterredRow)
                let missing = 4 - filterredRow.length
                let zeros = Array(missing).fill(0)
                //console.log(zeros)
                let newRow = zeros.concat(filterredRow)
                //console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    //test if working
    // moveRight()

    //move left
    function moveLeft(){
        for(let i = 0; i< 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

                //console.log(row)

                let filterredRow = row.filter(num => num)
                //console.log(filterredRow)
                let missing = 4 - filterredRow.length
                let zeros = Array(missing).fill(0)
                //console.log(zeros)
                let newRow = filterredRow.concat(zeros)
                //console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }
    //swipe down
    //move left
    function moveDown(){
        for(let i = 0; i< 4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            //console.log(row)

            let filterredCol = column.filter(num => num)
            //console.log(filterredCol)
            let missing = 4 - filterredCol.length
            let zeros = Array(missing).fill(0)
            //console.log(zeros)
            let newCol = zeros.concat(filterredCol)
            //console.log(newCol)

            squares[i].innerHTML = newCol[0]
            squares[i+width].innerHTML = newCol[1]
            squares[i+(width*2)].innerHTML = newCol[2]
            squares[i+(width*3)].innerHTML = newCol[3]
        }
    }

    //swipe up
    //move up
    function moveUp(){
        for(let i = 0; i< 4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            //console.log(row)

            let filterredCol = column.filter(num => num)
            //console.log(filterredCol)
            let missing = 4 - filterredCol.length
            let zeros = Array(missing).fill(0)
            //console.log(zeros)
            let newCol = filterredCol.concat(zeros)
            //console.log(newCol)

            squares[i].innerHTML = newCol[0]
            squares[i+width].innerHTML = newCol[1]
            squares[i+(width*2)].innerHTML = newCol[2]
            squares[i+(width*3)].innerHTML = newCol[3]
        }
    }

    // test if working 
    // moveLeft()

    function combineRow(){
        for(let i = 0; i< 15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineCol(){
        for(let i = 0; i< 12; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign keycodes;
    // arrow left = 37
    // arrow right = 39
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        } else if(e.keyCode === 37){
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode == 40){
            keyDown()
        }
    }
    document.addEventListener('keyup',control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        combineCol()
        moveDown()
        generate()
    }

    function keyUp(){
        moveUp()
        combineCol()
        moveUp()
        generate()
    }

    //check if reach the 2048
    function checkForWin(){
        for(let i = 0; i< squares.length; i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'Congrats! You win'
                document.removeEventListener('Keyup',control)
            }
        }
    }

    //check if lose
    function checkForLose(){
        let zeros = 0
        for(let i = 0; i < squares.length;i++){
            if(squares[i].innerHTML ==0){
                zeros++
            }
        }
        if(zeros === 0){
            resultDisplay.innerHTML == 'You Lose! Try Again'
            document.removeEventListener('keyup',control)
        }
    }











})