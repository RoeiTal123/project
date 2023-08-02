var MINE='💣'
var FLAG='🚩'
var hidden='🧱'
var EMPTY=''

var gBoard
var gLives=3
var gBombsToFind=2
var gTimer=0
var timerInterval

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    showncCount:0,
    markedCount:0,
    secsPassed:0
}

function onInit(){
    gBoard=createBoard()
    renderBoard()
    clearInterval(timerInterval)
    var elLivesCounter=document.querySelector('.livesCounter')
    var elHints=document.querySelector('.hints')
    elHints.innerText='🪄 🪄 🪄'
    var elSafety=document.querySelector('.safeButton')
    elSafety.innerText='3 safety uses'
    isHintOn=false
    var text1='------------- \n'
    var text2='-------------'
    gLives=3
    numberOfHints=3
    gTimer=0
    safetyUsesLeft=3
    var elTimer=document.querySelector('.timer')
    elTimer.innerText=gTimer+'s'
    elLivesCounter.innerText=text1+' '+gLives + ' lives left \n'+text2
    gGame.isOn=false
    gGame.showncCount=0
    gGame.markedCount=0
    gGame.secsPassed=0
    var elEmote=document.querySelector('.restartGame')
    elEmote.innerText='😁'

    //renderhidden()
}

function restartGame(){
    clearTimeout(hintTimeout)
    onInit()
}

function createBoard() {
    const board = []
    for (var i = 0; i < 4; i++) {
        board[i] = []
        for (var j = 0; j < 4; j++) {
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
            // Add a seat title:
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

function generateMines(){
    var index=0
    var placeOfFirstMine=getRandomInt(0,15)
    var placeOfSecondMine=getRandomInt(0,15)
    for (var i=0;i<4;i++){
        for (var j=0;j<4;j++){
            if(index===placeOfFirstMine||index===placeOfSecondMine){
                gBoard[i][j].isMine=true
            }
            index++
        }
    }
}

function onCellClicked(elcell, i, j) {
    const cell = gBoard[i][j]
    var selectedCell=elcell
    if(cell.isShown) return
    if(cell.isMarked) return
    if(isHintOn){
        var elHints=document.querySelector('.hints')
        isHintOn=false
        numberOfHints--
        if(numberOfHints===2) elHints.innerText='🪨 🪄 🪄'
        if(numberOfHints===1) elHints.innerText='🪨 🪨 🪄'
        if(numberOfHints===0) elHints.innerText='🪨 🪨 🪨'
        revealCellsAroundTemporarly(gBoard,i,j)
        return
    }
    gGame.isShown++
    if(!gGame.isOn){
        timerInterval=setInterval(timer,1000)
        gGame.isOn=true
        generateMines()
        addMineAroundCounts()
        countMinesAround()
        renderBoard()
        renderEmptyCell({i:i,j:j})
        getEmptyCells()
    }
    if(cell.isMine){
        renderCell({i:i,j:j},MINE)
        gLives--       
        var elLivesCounter=document.querySelector('.livesCounter')
        var text1='------------- \n'
        var text2='-------------'
        elLivesCounter.innerText=text1+' '+gLives + ' lives left \n'+text2
        var elEmote=document.querySelector('.restartGame')
        elEmote.innerText='😫'
        gBombsToFind--
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
        renderEmptyCell({i:i,j:j})
        revealCellsAround(gBoard,i,j,selectedCell)
    }
    if(cell.minesAroundCount!==0&&!cell.isMine&&!cell.isMarked){
        renderEmptyCell({i:i,j:j})
        renderNumberInCell({i:i,j:j},cell.minesAroundCount)
    }
    if(gBombsToFind===0){
        var elEmote=document.querySelector('.restartGame')
        elEmote.innerText='😎'
    } 
    var elCounter=document.querySelector('.bombsCounter')
    elCounter.innerText=countMinesAround(gBoard,i,j) + ' bombs around it'
    cell.isShown=true
    if(gBombsToFind===0){
        gameOver()
    }
}

function onRightClick(elcell, i, j) {
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
            }
        }
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

function timer(){
    gTimer++
    var elTimer=document.querySelector('.timer')
    elTimer.innerText=gTimer+'s'
    if(gTimer>60){
        elTimer.innerText=Math.round(gTimer/60)+'m '+gTimer%60+'s'
    }
}

function gameOver(){
    clearTimeout(hintTimeout)
    gGame.isOn=false
}