var isDarkMode=false

function getRandomInt(min,max){
	min=Math.floor(min)
	max=Math.ceil(max)
	return Math.floor((Math.random()*max-min)+min)
}

function getEmptyCells(){
	var emptyCells=[]
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard.length; j++) {
			var emptyCell={}
			if(i!==gStarterCell.i||j!==gStarterCell.j){
				emptyCell.i=i
				emptyCell.j=j
				emptyCells.push(emptyCell)
			}
		}
	}
	return emptyCells
}

function darkmodeSwitch(){
	var elDarkButton=document.querySelector('.darkmodeSwitch')
	var elBody=document.querySelector('.body')
	var elMinesCounter=document.querySelector('.minesCounter')
	var elLivesCounter=document.querySelector('.livesCounter')
    var elHints=document.querySelector('.hints')
    var elSafety=document.querySelector('.safeButton')
    var elTimer=document.querySelector('.timer')
    var elEmote=document.querySelector('.onRestartGame')
	var elExterminate=document.querySelector('.exterminator')
    var elDifficulty=document.querySelector('.difficulty')
	if(isDarkMode) { //to light mode
	    isDarkMode = false
		elDarkButton.innerText='☀️ -> 🌕'
		elDarkButton.style.color='black'
		elDarkButton.style.backgroundColor='white'

		elBody.style.backgroundColor='white'

		elMinesCounter.style.color='black'
		elMinesCounter.style.backgroundColor='white'

		elLivesCounter.style.color='black'
		elLivesCounter.style.backgroundColor='pink'

		elHints.style.color='black'
		elHints.style.backgroundColor='white'

		elSafety.style.color='black'
		elSafety.style.backgroundColor='white'

		elTimer.style.color='black'
		elTimer.style.backgroundColor='aqua'

		elEmote.style.color='black'
		elEmote.style.backgroundColor='white'

		elExterminate.style.color='black'
		elExterminate.style.backgroundColor='white'

		elDifficulty.style.color='black'
		elDifficulty.style.backgroundColor='white'
	} else { //to dark mode
		isDarkMode = true
		elDarkButton.innerText='☀️ <- 🌕'
		elDarkButton.style.color='white'
		elDarkButton.style.backgroundColor='black'
		
		elBody.style.backgroundColor='black'

		elMinesCounter.style.color='white'
		elMinesCounter.style.backgroundColor='black'

		elLivesCounter.style.color='white'
		elLivesCounter.style.backgroundColor='black'
		
		elHints.style.color='white'
		elHints.style.backgroundColor='black'
		
		elSafety.style.color='white'
		elSafety.style.backgroundColor='black'
		
		elTimer.style.color='white'
		elTimer.style.backgroundColor='black'
		
		elEmote.style.color='white'
		elEmote.style.backgroundColor='black'
		
		elExterminate.style.color='white'
		elExterminate.style.backgroundColor='black'

		elDifficulty.style.color='white'
		elDifficulty.style.backgroundColor='black'
	}
}