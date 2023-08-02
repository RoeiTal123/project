function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function unRenderCell(location) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = ''
}

function renderNumberInCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.remove('hidden')
    elCell.classList.add('empty')
    elCell.innerText = value
}

function unRenderNumberInCell(location) {
    console.log(':(')
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.add('hidden')
    elCell.classList.remove('empty')
    elCell.innerText = ''
}

function renderEmptyCell(location){
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.remove('hidden')
    elCell.classList.add('empty')
}

function unRenderEmptyCell(location){
    console.log(';(')
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.add('hidden')
    elCell.classList.remove('empty')
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
