let canvas = document.getElementsByTagName("canvas")[0];
let ctx = canvas.getContext('2d');

let height = canvas.height;
let width = canvas.width;

const SIZE = 10;

let score = 0;

let dx = 0;
let dy = SIZE;

function drawRect(x, y) {
    ctx.fillRect(x, y, SIZE, SIZE);
}

let food = {
    x: 0,
    y: 0
};

function addFood() {
    let xVal = Math.floor(Math.random() * width / SIZE) * SIZE;
    let yVal = Math.floor(Math.random() * height / SIZE) * SIZE;

    food = {
        x: xVal,
        y: yVal
    }
}

addFood();

let snake = [];
function addSnake(xVal, yVal) {
    snake.push({
        x: xVal,
        y: yVal 
    })
}

addSnake(0, 0)
addSnake(SIZE, 0)
addSnake(SIZE * 2, 0)

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        drawRect(snake[i].x, snake[i].y);
    }
}

function create() {
    ctx.clearRect(0, 0, width, height)
    
    snake.shift();

    if (foodCollide()) {
        addHead();
        addFood();

        score = score + 10;

        let points = document.getElementsByTagName("span")[0];
        points.innerHTML = score;
    }

    if (selfCollide()) {
        console.log("collide")
        alert("You lost :(");
        clearInterval(timer);
    }

    addHead();

    drawSnake();
    drawRect(food.x, food.y);
}

create()

function addHead() {
    let x = snake[snake.length - 1].x + dx;
    let y = snake[snake.length - 1].y + dy

    if (x > width) {
        x = 0;
    } else if (y > height) {
        y = 0;
    } else if (x < 0) {
        x = width;
    } else if (y < 0) {
        y = height;
    }

    addSnake(x, y);
}

let timer = setInterval(create, 100);

window.addEventListener("keydown", keys)

function keys(e) {
    if (e.keyCode == 38) {
        console.log("up");
        dx = 0;
        dy = -SIZE;
    } else if (e.keyCode == 39) {
        dx = SIZE;
        dy = 0;
        console.log("right");
    } else if (e.keyCode == 40) {
        dx = 0;
        dy = SIZE;
        console.log("down");
    } else if (e.keyCode == 37) {
        console.log("left");
        dx = -SIZE;
        dy = 0;
    }
}

function foodCollide() {
    let head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y) {
        return true;
    }

    return false;
}

function selfCollide() {
    let head = snake[snake.length - 1];

    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[i].x == head.x && snake[i].y == head.y) {
            return true;
        }
    }

    return false;
}