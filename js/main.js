var MINE = '💣'
var FLAG = '🚩'
var hidden = '🧱'
var EMPTY = ''

var gBoard
var gLives = 3 
var gMinesToFind = 2
var gTimer = 0
var gDifficulty = 'Easy'
var gStarterCell
var timerInterval
var gMinesRevealed=0

var gLevel = {
    SIZE : 4,
    MINES : 2
}
var gGame = {
    isOn : false,
    showncCount : 0,
    markedCount : 0,
    secsPassed : 0
}

function onInit(){
    var elBoard=document.querySelector('.board')
    elBoard.style.width=gLevel.SIZE*62.5+'px'
    gBoard=createBoard()
    renderBoard()
    clearInterval(timerInterval)
    var elLivesCounter=document.querySelector('.livesCounter')
    var elHints=document.querySelector('.hints')
    var elSafety=document.querySelector('.safeButton')
    var elTimer=document.querySelector('.timer')
    var elEmote=document.querySelector('.onRestartGame')
    var elExterminate=document.querySelector('.exterminator')
    
    isHintOn=false
    gLives=3
    gNumberOfHints=3
    gTimer=0
    gSafetyUsesLeft=3
    gMinesToFind=gLevel.MINES
    gStarterCell=undefined

    var text1='------------- \n'
    var text2='-------------'
    elLivesCounter.innerText=text1+' '+gLives + ' lives left \n'+text2
    elHints.innerText='🪄 🪄 🪄'
    elSafety.innerText='3 safety uses'
    elTimer.innerText=gTimer+'s'
    elExterminate.innerText='EXTERMINATION'
    elEmote.innerText='😁'

    gGame.isOn=false
    gGame.showncCount=0
    gGame.markedCount=0
    gGame.secsPassed=0
}

function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell={ 
                minesAroundCount:-1, 
                isShown:false,
                isMine:false,
                isMarked:false
            }
            board[i][j]=cell
        }
    }
    return board
}

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class="board-row" >\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            var className = `cell-${i}-${j}`
            className += ' hidden'
            const title = `Cell: ${i + 1}, ${j + 1}`
            strHTML += `\t<td  
                title="${title}" class="${className}"  
                onclick="onCellClicked(this,${i}, ${j})" oncontextmenu="onRightClick(this,${i}, ${j})">
                </td>\n`
        }
        strHTML += `</tr>\n`
    }
    const elCells = document.querySelector('.board-cells')
    elCells.innerHTML = strHTML
}


function onCellClicked(elcell, i, j) {
    const cell = gBoard[i][j]
    var selectedCell=elcell
    if(cell.isShown) return
    if(cell.isMarked) return
    if(gMinesToFind===0) return
    if(gLives===0) return
    if(isHintOn){
        var elHints=document.querySelector('.hints')
        isHintOn=false
        gNumberOfHints--
        if(gNumberOfHints===2) elHints.innerText='🪨 🪄 🪄'
        if(gNumberOfHints===1) elHints.innerText='🪨 🪨 🪄'
        if(gNumberOfHints===0) elHints.innerText='🪨 🪨 🪨'
        revealCellsAroundTemporarly(gBoard,i,j)
        return
    }
    if(gStarterCell===undefined){
        timerInterval=setInterval(timer,1000)
        gGame.isOn=true
        gStarterCell={i:i,j:j}
        cell.isShown=true
        gGame.showncCount=1
        generateMines()
        addMineAroundCounts()
        countMinesAround()
        renderBoard()
        renderEmptyCell({i:i,j:j})
        return
    }
    if(cell.isMine){
        gMinesRevealed++
        gMinesToFind--
        renderCell({i:i,j:j},MINE)
        var elEmote=document.querySelector('.onRestartGame')
        elEmote.innerText='😫'
        gLives--       
        var elLivesCounter=document.querySelector('.livesCounter')
        var text1='------------- \n'
        var text2='-------------'
        elLivesCounter.innerText=text1+' '+gLives + ' lives left \n'+text2
        if(gLives===1){
            elLivesCounter.innerText=text1+'1 life left \n'+text2
            elEmote.innerText='😭'
        }
        if(gLives===0){
            elEmote.innerText='💀'
            gameOver()
        }
    }
    if(cell.isMarked){
        renderCell({i:i,j:j},FLAG)
    }
    if(cell.isShown){

    }
    cell.minesAroundCount=countMinesAround(gBoard,i,j)
    if(cell.minesAroundCount===0&&!cell.isMine&&!cell.isMarked){
        gGame.showncCount++
        renderEmptyCell({i:i,j:j})
        revealCellsAround(gBoard,i,j,selectedCell)
    }
    if(cell.minesAroundCount!==0&&!cell.isMine&&!cell.isMarked){
        gGame.showncCount++
        renderEmptyCell({i:i,j:j})
        renderNumberInCell({i:i,j:j},cell.minesAroundCount)
    }
    if(gMinesToFind===0||(gGame.showncCount===(gLevel.SIZE**2-gLevel.MINES))){
        var elEmote=document.querySelector('.onRestartGame')
        elEmote.innerText='😎'
        clearInterval(timerInterval)
        gameOver()
    } 
    var elCounter=document.querySelector('.minesCounter')
    elCounter.innerText=countMinesAround(gBoard,i,j) + ' bombs around it'
    cell.isShown=true
}

function onRightClick(elcell, i, j) {
    if(gMinesToFind===0) return
    if(!gGame.isOn) return
    const cell = gBoard[i][j]
    if(!cell.isShown){
        renderCell({i:i,j:j},FLAG)
        if(cell.isMarked){
            renderCell({i:i,j:j},EMPTY)
            cell.isMarked=false
        } else {
            cell.isMarked=true
        }
    }
}

function onRestartGame(){
    var elTimer=document.querySelector('.timer')
    elTimer.innerText='0s'
    clearTimeout(hintTimeout)
    clearInterval(timerInterval)
    onInit()
}

function onChangeDifficulty(){
    var elDifficulty=document.querySelector('.difficulty')
    if(gDifficulty === 'Easy'){
        elDifficulty.innerText = 'Medium (8x8 , 8 mines)'
        gLevel.SIZE=8
        gLevel.MINES=8
        gMinesToFind=8
        gDifficulty = 'Medium'  
    } else if (gDifficulty === 'Medium'){
        elDifficulty.innerText = 'Hard (12x12 , 16 mines)'
        gLevel.SIZE=12
        gLevel.MINES=16
        gMinesToFind=16
        gDifficulty = 'Hard'
    } else if (gDifficulty === 'Hard'){
        elDifficulty.innerText = 'Easy (4x4 , 2 mines)'
        gLevel.SIZE=4
        gLevel.MINES=2
        gMinesToFind=2
        gDifficulty = 'Easy'
    }
    onInit()
}

function revealCellsAround(board, rowIdx, colIdx){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (!currCell.isMine&&!currCell.isMarked&&!currCell.isShown){ 
                if(currCell.minesAroundCount===0){
                    renderEmptyCell({i:i,j:j})
                } else {
                    renderNumberInCell({i:i,j:j},currCell.minesAroundCount)
                }
                currCell.isShown=true
                gGame.showncCount++
            }
        }
    }
}

function generateMines(){
    var emptyCells=getEmptyCells()
    var chosenEmptyCells=[]
    var placeOfMine=getRandomInt(0,gLevel.SIZE**2-1)
    var placesForMines=[]
    var counter=0
    while (counter!==gLevel.MINES){
        if(placesForMines.includes(placeOfMine)===false){
            placeOfMine=getRandomInt(-1,gLevel.SIZE**2-1)
            placesForMines.push(placeOfMine)
            counter++
        } else {
            placeOfMine=getRandomInt(-1,gLevel.SIZE**2-1)
        }
    }  
    for(var i=0;i<placesForMines.length;i++){
        gBoard[emptyCells[placesForMines[i]].i][emptyCells[placesForMines[i]].j].isMine=true
        chosenEmptyCells.push(emptyCells[placesForMines[i]])
    }
}

function addMineAroundCounts(){
    for (var i=0;i<gBoard.length;i++){
        for(var j=0;j<gBoard[i].length;j++){
            gBoard[i][j].minesAroundCount=countMinesAround(gBoard,i,j)
        }
    }
}

function countMinesAround(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine){
                count++
            } 
        }
    }
    return count
}

function gameOver(){
    clearTimeout(hintTimeout)
    clearInterval(timerInterval)
    renderAllMines()
    gGame.isOn=false
}

function timer(){
    gTimer++
    gGame.secsPassed++
    var elTimer=document.querySelector('.timer')
    elTimer.innerText=gTimer+'s'
    if(gTimer>60){
        elTimer.innerText=Math.round(gTimer/60)+'m '+gTimer%60+'s'
    }
}
