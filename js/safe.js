var safetyTimer
var safetyCell
var safetyUsesLeft=3
function showSafeCell(){
    if(safetyUsesLeft===0) {
        alert('no uses left')
        return
    }
    safetyUsesLeft--
    var elSafety=document.querySelector('.safeButton')
    elSafety.innerText=safetyUsesLeft+' safety uses'
    var placesToCall=getEmptyCells()
    var oneToBeChosen=getRandomInt(0,placesToCall.length-1)
    var i=placesToCall[oneToBeChosen].i
    var j=placesToCall[oneToBeChosen].j
    safetyCell={i:i,j:j}
    if (gBoard[i][j].minesAroundCount!==0){
        renderNumberInCell({i:i,j:j},gBoard[i][j].minesAroundCount)
    } else {
        renderEmptyCell({i:i,j:j})
    }
    safetyTimer=setTimeout(hideSafeCell,3000)
}

function hideSafeCell(){
    var i=safetyCell.i
    var j=safetyCell.j
    if (gBoard[i][j].minesAroundCount!==0){
        unRenderNumberInCell({i:i,j:j})
    } else {
        unRenderEmptyCell({i:i,j:j})
    }
    clearTimeout(safetyTimer)
}

function getEmptyCells(){
	var emptyCells=[]
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var emptyCell={}
			if(!gBoard[i][j].isMarked&&!gBoard[i][j].isMine&&!gBoard[i][j].isShown){
				emptyCell.i=i
				emptyCell.j=j
				emptyCells.push(emptyCell)
			}
		}
	}
	return emptyCells
}