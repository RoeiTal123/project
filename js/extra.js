
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

