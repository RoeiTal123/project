function onMegaExpand(board, rowIdx, colIdx){
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
function revealCellsAround2(board, rowIdx, colIdx){
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