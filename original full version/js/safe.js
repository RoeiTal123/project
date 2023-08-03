var gSafetyTimer
var gSafetyCell
var gSafetyUsesLeft=3
function showSafeCell(){
    if(gSafetyUsesLeft===0) {
        alert('no uses left')
        return
    }
    if(gStarterCell===undefined){
        alert('can only be used after the game starts')
        return
    }
    gSafetyUsesLeft--
    var elSafety=document.querySelector('.safeButton')
    elSafety.innerText=gSafetyUsesLeft+' safety uses'
    var placesToCall=getEmptyCellsForHint()
    var oneToBeChosen=getRandomInt(0,placesToCall.length-1)
    var i=placesToCall[oneToBeChosen].i
    var j=placesToCall[oneToBeChosen].j
    gSafetyCell={i:i,j:j}
    if (gBoard[i][j].minesAroundCount!==0){
        renderNumberInCell({i:i,j:j},gBoard[i][j].minesAroundCount)
    } else {
        renderEmptyCell({i:i,j:j})
    }
    gSafetyTimer=setTimeout(hideSafeCell,3000)
}

function hideSafeCell(){
    var i=gSafetyCell.i
    var j=gSafetyCell.j
    if (gBoard[i][j].minesAroundCount!==0){
        unRenderNumberInCell({i:i,j:j})
    } else {
        unRenderEmptyCell({i:i,j:j})
    }
    clearTimeout(gSafetyTimer)
}

function getEmptyCellsForHint(){
	var emptyCells=[]
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard.length; j++) {
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