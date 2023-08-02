var UNUSED_HINT='🪄'
var UNDER_USE_HINT='🔮'
var USED_HINT='🪨'
var isHintOn=false
var hintTimeout
var gCellsToReveal
var gCellsToHide=[]
var numberOfHints=3

function onHints(){
    var elHints=document.querySelector('.hints')
    if(isHintOn||!gGame.isOn) return
    console.log('use hint')
    isHintOn=true
    if(numberOfHints===3){
        elHints.innerText='🔮 🪄 🪄'
    }
    if(numberOfHints===2){
        elHints.innerText='🪨 🔮 🪄'
    }
    if(numberOfHints===1){
        elHints.innerText='🪨 🪨 🔮'
    }
}

function revealCellsAroundTemporarly(board, rowIdx, colIdx){
    console.log('showing')
    gCellsToReveal=[]
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (!currCell.isMine&&!currCell.isMarked&&!currCell.isShown){ 
                gCellsToReveal.push({i:i,j:j})
                if(currCell.minesAroundCount===0){
                    renderEmptyCell({i,j})
                } else {
                    renderNumberInCell({i,j},currCell.minesAroundCount)
                }
                currCell.isShown=true
            }
        }
    }
    console.log(gCellsToReveal)
    hintTimeout=setTimeout(hideCellsAround,5000)
}

function hideCellsAround(){
    console.log('hiding')
    gCellsToHide=gCellsToReveal
    for (var i=0;i<gCellsToHide.length;i++){
        if(gCellsToHide[i].minesAroundCount!==0) {
            unRenderNumberInCell(gCellsToHide[i])
        } else {
            unRenderEmptyCell(gCellsToHide[i])
        }
        gBoard[gCellsToHide[i].i][gCellsToHide[i].j].isShown=false
    }
    clearTimeout(hintTimeout)
}