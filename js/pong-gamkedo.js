
var canvas;
var ctx;

var ballX = 300;
var ballY = 200;
var ballSpeedX = 10;
var ballSpeedY = 10;
var player1Y = 250;
var player2Y = 100;
var player1Speed = 20;
var player2Speed = 5;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;
var player1Direction = "up";

document.getElementByClass('scoreP1').innerHTML = "bunny";


// function calcMousePos(evt) {
//
//     var rect = canvas.getBoundingClientRect();
//     var root = document.documentElement;
//     var mouseX = evt.clientX - rect.left - root.scrollLeft;
//     var mouseY = evt.clientY - rect.top - root.scrollTop;
//     return {
//         x:mouseX,
//         y:mouseY
//     };
// }

window.onload = function () {

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    var fps = 30;
    setInterval(function () {
        drawEverything();
        moveEverything();
    }, 1000/fps);

    // canvas.addEventListener("mousemove", function (evt) {
    //
    //     var mousePos = calcMousePos(evt);
    //     player1Y = mousePos.y;
    // });

};

function drawEverything() {

    // Color the canvas
    colorRect(0, 0, canvas.width, canvas.height, "black");

    // Player 1 piece
    colorRect(0, player1Y, 20, 100, "white");

    // Player 2 piece
    colorRect(canvas.width-20, player2Y, 20, 100, "white");

    // Draw the ball
    colorCircle(ballX, ballY, 10, "white");

    // Scoreboard
    // ctx.font = "50px Arial";
    // ctx.fillText(player1Score, 200, 70);
    // ctx.fillText(player2Score, canvas.width-200, 70);

    // Net
    var net = [];

    for (var i = 0; i <= canvas.height; i+=60) {

        colorRect(canvas.width/2-3, i, 6, 40, "white");
    }
};

function colorCircle(centerX, centerY, radius, drawColor) {

    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.fill();
}

function colorRect(topX, topY, width, height, drawColor) {

    ctx.fillStyle = drawColor;
    ctx.fillRect(topX, topY, width, height);
}

function ballReset() {

    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        player1Score = 0;
        player2Score = 0;
    }

    ballX = canvas.width/2;
    ballY = canvas.width/2;
    ballSpeedX = -ballSpeedX;
}

function computerMovement() {

    if (player2Y + 100 < ballY) {
        player2Y += 26;
    } else if (player2Y - 50 > ballY) {
        player2Y -= 26;
    }
}

function moveEverything() {

    // computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width-18) {

        if (ballY > player2Y && ballY < player2Y + 100) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            ballReset();
        }
    } else if (ballX < 18) {

        if (ballY > player1Y && ballY < player1Y + 100) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (player1Y + 50)
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballReset();
        }
    } else if (ballY > canvas.height-10) {
        ballSpeedY = -ballSpeedY;
    } else if (ballY < 10) {
        ballSpeedY = -ballSpeedY;
    }


};


// Controls
document.addEventListener("keydown", function (e) {

    var key = e.which;

    if (key == "87") {
        player1Y -= player1Speed;
    } else if (key == "83") {
        player1Y += player1Speed;
    }

    if (key == "39") {
        player2Y -= player1Speed;
    } else if (key == "34") {
        player2Y += player1Speed;
    }
});
