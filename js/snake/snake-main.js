(function ($) {

    // Define Vars
    var canvas = document.getElementById("snakeCanvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var cellWidth = 25;
    var direction = "right";
    var food;
    var speed = 60;
    var snakeColor = "green";
    var showEndGameScreen = false;

    // Snake Array
    var snakeArray;

    // Controls
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;

    // Initializer
    window.onload = function() {

        createSnake();
        createFood();

        var fps = 10;
        setInterval(function () {
            paint();
        }, 1000/fps)

        // if (typeof gameLoop != "undefined") clearInterval(gameLoop);
        // gameLoop = setInterval(paint, speed);

        document.addEventListener("keydown", keyPressed);
    };

    // Create Snake
    function createSnake() {

        var length = 5;
        snakeArray = [];

        for (var i = length - 1; i >= 0; i--) {
            snakeArray.push({x: i, y: 0});
        }

    };

    // Create Food
    function createFood() {

        food = {
            x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
            y: Math.round(Math.random() * (height - cellWidth) / cellWidth)
        };
    };

    // Paint Snake
    function paint() {

        if (showEndGameScreen) {

            ctx.globalAlpha = 0.5;
            drawRect(0, 0, canvas.width, canvas.height, "black");
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = "white";
            ctx.font = "60px Carter One";
            ctx.strokeStyle="transparent";
            ctx.moveTo(400,20);
            ctx.lineTo(400,170);
            ctx.stroke();

            ctx.textAlign = "center"
            ctx.fillText("Game over!", 400, 160);
            ctx.fillText("Press ENTER for new game", 400, 260);
            return;
        }
        // show end game screen
        // if (showEndGameScreen) {
        //
        //     return; // stop the movement
        // }

        // paint/clear canvas
        drawRect(0, 0, canvas.width, canvas.height, "#181818");

        var nx = snakeArray[0].x;
        var ny = snakeArray[0].y;

        if (direction == "right") nx++;
        else if (direction == "left") nx--;
        else if (direction == "up") ny--;
        else if (direction == "down") ny++;

        // Check for collision
        if (nx == -1 || nx == width/cellWidth || ny == -1 || ny == height/cellWidth || checkCollision(nx, ny, snakeArray)) {

            showEndGameScreen = true;
        }

        if (nx == food.x && ny == food.y) {

            var tail = {x: nx, y: ny};
            createFood();
        } else {

            var tail = snakeArray.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snakeArray.unshift(tail);

        for (var i = 0; i < snakeArray.length; i++) {

            var c = snakeArray[i];
            paintCell(c.x, c.y);
        }

        paintCell(food.x, food.y);

    };

    function paintCell(x, y) {

        ctx.fillStyle = snakeColor;
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

        ctx.strokeStyle = "yellow";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    };

    function drawRect(x, y, w, h, color) {

        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    function checkCollision(x, y, array) {

        for (var i = 0; i < array.length; i++) {

            if (array[i.x == x && array[i].y == y]) return true;
        }

        return false;
    };

    // Controls
    function keyPressed(e) {

        e.preventDefault()

        if (e.keyCode == KEY_LEFT && direction != "right") {
            direction = "left";
        }
        if (e.keyCode == KEY_UP && direction != "down") {
            direction = "up";
        }
        if (e.keyCode == KEY_RIGHT && direction != "left") {
            direction = "right";
        }
        if (e.keyCode == KEY_DOWN && direction != "up") {
            direction = "down";
        }
    }


    // JavaScript Version
    // var c;
    // var ctx;
    //
    // function init() {
    //
    //     c = document.getElementById("snakeCanvas");
    //     ctx = c.getContext("2d");
    //     draw();
    // };
    //
    // function draw() {
    //
    //     // Snake
    //     ctx.fillStyle = "#fff";
    //     ctx.fillRect(30, 30, 50, 14);
    //
    //     ctx.strokeStyle = "#000";
    //     ctx.lineWidth = "1";
    //     ctx.strokeRect(30, 30, 50, 14);
    // };
})(jQuery);
