gameBoard = document.querySelector('.grid')

const GRID_SIZE = 21

let snakeBody = [{ x: 8, y: 5}]
let food = { x: 10, y: 10 }

let direction = { x: 1, y: 0 }

let timer = setInterval(main, 350)

document.addEventListener('keydown', e => {
	switch(e.key) {
		case 'ArrowUp':
			if (direction.y !== 1) {
				direction.x = 0
				direction.y = -1
			}
			break
		case 'ArrowLeft':
			if (direction.x !== 1) {
				direction.x = -1
				direction.y = 0
			}
			break
		case 'ArrowDown':
			if (direction.y !== -1) {
				direction.x = 0
				direction.y = 1
			}
			break
		case 'ArrowRight':
			if (direction.x !== -1) {
				direction.x = 1
				direction.y = 0
			}
			break
	}
})

function main() {
	
	updateSnake()
	drawSnake()
	checkLose()
	updateFood()
	drawFood()
}



function drawSnake() {
	gameBoard.innerHTML = ''
	snakeBody.forEach(snake => {
		const div = document.createElement('div')
		div.classList.add('snake')
		div.style.gridRowStart = snake.y
		div.style.gridColumnStart = snake.x
		gameBoard.append(div)
	})
}

function updateSnake() {

	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i] } /**Figure out why this needs to exist**/
	}

	snakeBody[0].x += direction.x
	snakeBody[0].y += direction.y
}


function extendSnake() {
	snakeBody.push(snakeBody[snakeBody.length - 1])
}

function checkOutsideGrid(object) {
	return (object.x > GRID_SIZE || object.x < 0 || object.y > GRID_SIZE || object.y < 0)
}

function samePosition(obj1, obj2) {
	return obj1.some(element => {
		return element.x === obj2.x && element.y === obj2.y
	})
	
}



function getRandomPosition() {
	return { 
		x: Math.floor(Math.random() * GRID_SIZE) + 1,
		y: Math.floor(Math.random() * GRID_SIZE) + 1
	}
}

function drawFood() {
	const div = document.createElement('div')
	div.classList.add('food')
	div.style.gridRowStart = food.y
	div.style.gridColumnStart = food.x
	gameBoard.append(div)
}

function updateFood() {
	if (samePosition(snakeBody, food)) {
		extendSnake()
		do {
			food = getRandomPosition()
		}
		while (samePosition(snakeBody, food))
	}
}

function checkLose() {
	snakeHead = snakeBody.shift()
	if(samePosition(snakeBody, snakeHead) || checkOutsideGrid(snakeHead)) {
		alert('you lose')
		clearInterval(timer)
	}
	snakeBody.unshift(snakeHead)
}