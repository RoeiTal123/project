function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function renderNumberInCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.remove('hidden')
    elCell.classList.add('empty')
    elCell.innerText = value
}

function renderEmptyCell(location){
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.classList.remove('hidden')
    elCell.classList.add('empty')
}