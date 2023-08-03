var gMinesRemoved=[]

function onExtermination(){
    var elExterminate=document.querySelector('.exterminator')
    elExterminate.innerText='EXTERMINATED'
    if(gStarterCell===undefined){
        alert('can only be used after the game starts')
        return
    }
    for(var i=0;i<gBoard.length;i++){
        for(var j=0;j<gBoard[0].length;j++){
            if(gBoard[i][j].isMine){
                gBoard[i][j].isMine=false
                gMinesRemoved.push({i:i,j:j})
                gMinesToFind--
            }
            if(gMinesToFind===gLevel.MINES-gMinesRevealed-3){
                console.log(gMinesRemoved)
                return
            }
            if(gMinesToFind===0){
                clearScreen()
                return
            }
        }
    }
}

function revaluateCellsAroundMines(){
    var index=0
    for (var i=0;i<gBoard.length;i++){
        for(var j=0;j<gBoard[i].length;j++){
            if(gMinesRemoved[index].i===i&&gMinesRemoved[index].j===j){
                gBoard[i][j].minesAroundCount=countMinesAround(gBoard,i,j)
                revealCellsAround(gBoard,i,j)
            }
        }
    }
}

function clearScreen(){
    gameOver()
    renderWholeScreen()
}