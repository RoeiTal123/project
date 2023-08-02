var MINE='💣'
var FLAG='🚩'
var hidden='🧱'

var gBoard
var gLives=3
var gBombsToFind=2

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
    //generateMines()

    var elLivesCounter=document.querySelector('.livesCounter')
    var text1='------------- \n'
    var text2='-------------'
    gLives=3
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
                onclick="onCellClicked(this,${i}, ${j})" >
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

function renderhidden(){
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]
            if(!cell.isMine&&!cell.isMarked&&!cell.isShown) {
                renderCell({i:i,j:j},hidden)
            }
        }
    }
}

function onCellClicked(elcell, i, j) {
    const cell = gBoard[i][j]
    var selectedCell=elcell
    if(cell.isShown) return
    gGame.isShown++
    if(!gGame.isOn){
        gGame.isOn=true
        generateMines()
        addMineAroundCounts()
        countMinesAround()
        renderBoard()
        renderEmptyCell({i:i,j:j})
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
}

function revealCellsAround(board, rowIdx, colIdx, selectedCell){
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

function getRandomInt(min,max){
	min=Math.floor(min)
	max=Math.ceil(max)
	return Math.floor((Math.random()*max-min)+min)
}

function gethiddenCells(){
	var hiddenCells=[]
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 12; j++) {
			var hiddenCell={}
			if(gBoard[i][j]===hidden){
				hiddenCell.i=i
				hiddenCell.j=j
				hiddenCells.push(hiddenCell)
			}
		}
	}
	return hiddenCells
}