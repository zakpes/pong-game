
var canvas;
var ctx;

// Court change
// var hardcourt = document.getElementById("courtToggle").selectedIndex = "0";
// var clay = document.getElementById("courtToggle").selectedIndex = "1";
// var grass = document.getElementById("courtToggle").selectedIndex = "2";

// document.addEventListener("change", function () {
//
//     if (hardcourt) {
//         courtSurface = "hsl(210, 41%, 55%)";
//     } else if (clay) {
//         courtSurface = "hsl(20, 73%, 60%)";
//     }
// });
var courtSurface = "hsl(218, 50%, 40%)";
var courtSurface2 = "hsl(218, 50%, 40%)";

// function changeCourtSurface() {
//         if (hardcourt) {
//             courtSurface = "hsl(210, 41%, 55%)";
//         }
//         if (clay) {
//             courtSurface = "hsl(20, 73%, 60%)";
//         }
//         if (grass) {
//             courtSurface = "hsl(91, 70%, 41%)";
//         }
// }

var ballX = 400;
var ballY = 300;
var ballSpeedX = 0;
var ballSpeedY = 0;
var player1Y = 250;
var player2Y = 250;
var player1X = 30;
var player2X = 750;
var player1Speed = 20;
var player2Speed = 20;
var player1ScoreHolder = document.getElementById("scoreP1");
var player2ScoreHolder = document.getElementById("scoreP2");
var player1Score = 0;
var player2Score = 0;
var lineWidth = 5;
const WINNING_SCORE = 11;

var player1Name = document.getElementById("player1").innerHTML = prompt("Enter Player 1 name");
var player2Name = document.getElementById("player2").innerHTML = prompt("Enter Player 2 name");
var player1Won = false;
var player2Won = false;

var showStartScreen = true;
var showWinScreen = false;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_W = 87;
const KEY_S = 83;
const KEY_ENTER = 13;
const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;

var keyHeldUpP1 = false;
var keyHeldDownP1 = false;
var keyHeldUpP2 = false;
var keyHeldDownP2 = false;

var ballSound = document.getElementById("ball-sound");
var ballImg = document.createElement("img");
var ballImgLoaded = false;

var cheerSound = document.createElement("audio");
var cheerSoundLoaded = false;

var bodyBG = document.getElementById("pongBody");

var clayBG = document.createElement("img");

function keyPressed(evt) {

    evt.preventDefault();
    if (evt.keyCode == KEY_1) {
        courtSurface = "hsl(218, 50%, 40%)";
        courtSurface2 = "hsl(218, 50%, 40%)";
        bodyBG.style.backgroundColor = "hsl(354, 56%, 18%)";
        clayBG.src = "img/hardcourt-bg-slate800.png";
    }
    if (evt.keyCode == KEY_2) {
        courtSurface = "hsl(12, 60%, 41%)";
        courtSurface2 = "hsl(12, 60%, 41%)";
        bodyBG.style.backgroundColor = "hsl(16, 75%, 37%)";
        clayBG.src = "img/clay-bg2.png";
    }
    if (evt.keyCode == KEY_3) {
        courtSurface = "hsl(73, 66%, 29%)";
        courtSurface2 = "hsl(69, 51%, 40%)";
        bodyBG.style.backgroundColor = "hsl(92, 47%, 39%)";
        clayBG.src = "img/grass-bg800.png";
    }
    if (evt.keyCode == KEY_W) {
        keyHeldUpP1 = true;
    }
    if (evt.keyCode == KEY_S) {
        keyHeldDownP1 = true;
    }
    if (evt.keyCode == KEY_UP_ARROW) {
        keyHeldUpP2 = true;
    }
    if (evt.keyCode == KEY_DOWN_ARROW) {
        keyHeldDownP2 = true;
    }
    if (evt.keyCode == KEY_ENTER) {

        showStartScreen = false;
        player1Score = 0;
        player2Score = 0;
        showWinScreen = false;

        player1ScoreHolder.innerHTML = "0";
        player2ScoreHolder.innerHTML = "0";

        var ballDirection = Math.floor(Math.random() * 2);
        ballSpeedY = 0;
        player1Y = 250;
        player2Y = 250;

        if (ballDirection <= 0.5) {

            ballSpeedX = -16;
        } else {
            ballSpeedX = 16;
        }
    }
}

function keyReleased(evt) {

    evt.preventDefault();
    if (evt.keyCode == KEY_W) {
        keyHeldUpP1 = false;
    }
    if (evt.keyCode == KEY_S) {
        keyHeldDownP1 = false;
    }
    if (evt.keyCode == KEY_UP_ARROW) {
        keyHeldUpP2 = false;
    }
    if (evt.keyCode == KEY_DOWN_ARROW) {
        keyHeldDownP2 = false;
    }
}

window.onload = function () {

    canvas = document.getElementById("pongCanvas");
    ctx = canvas.getContext("2d");

    var fps = 30;
    setInterval(function () {
        drawEverything();
        moveEverything();
    }, 1000/fps);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    ballImg.onload = function () {
        ballImgLoaded = true;
    }

    cheerSound.onload = function () {
        cheerSoundLoaded = true;
    }

    ballImg.src = "img/tennis-ball-20.png";
    cheerSound.src = "sound/cheer.wav";
    clayBG.src = "img/hardcourt-bg-slate800.png";
};

function drawEverything() {

    // Color the canvas - clears the canvas
    colorRect(0, 0, canvas.width, canvas.height, "white");

    // Color the canvas in stripes
    // for (var i = 0; i <= canvas.height; i+=100) {
    //     colorRect(0, i, canvas.width, 50, courtSurface);
    // }
    //
    // for (var i = 50; i <= canvas.height; i+=100) {
    //     colorRect(0, i, canvas.width, 50, courtSurface2);
    // }

    ctx.drawImage(clayBG, 0, 0);

    // Draw the court lines
    ctx.fillStyle = "white";
    colorRect(0, canvas.height/8, canvas.width, lineWidth);
    colorRect(0, canvas.height-canvas.height/8-5, canvas.width, lineWidth);
    colorRect(canvas.width/4-20, canvas.height/8, lineWidth, canvas.height/8*6);
    colorRect(canvas.width-canvas.width/4+10, canvas.height/8, lineWidth, canvas.height/8*6);
    colorRect(canvas.width/4-20, canvas.height/2-2.5, canvas.width/4*2+30, lineWidth);

    // Player 1 piece
    colorRect(player1X, player1Y, 20, 100, "white");

    // Player 2 piece
    colorRect(player2X, player2Y, 20, 100, "white");

    // Draw the ball
    colorCircle(ballX, ballY, 10, "#c6ed2c");
    if (ballImgLoaded) {

        ctx.drawImage(ballImg, ballX-10, ballY-10);
    }

    // Scoreboard
    // ctx.font = "20px Arial";
    // ctx.fillStyle = "white";
    // ctx.fillText(player1Score, 200, 70);
    // ctx.fillText(player2Score, canvas.width-200, 70);

    // Net
    colorRect(canvas.width/2-8, 0, 1, canvas.height, "white")
    colorRect(canvas.width/2-3, 0, 1, canvas.height, "white")
    colorRect(canvas.width/2+2, 0, 1, canvas.height, "white")
    colorRect(canvas.width/2+7, 0, 1, canvas.height, "black")

    for (var i = 0; i <= canvas.height; i+=20) {

        // colorRect(canvas.width/2-3, i, 6, 10, "#000");
        ctx.strokeStyle = "#000";
        ctx.strokeRect(canvas.width/2-3, i+10, 6, 10);
        ctx.strokeRect(canvas.width/2-8, i, 6, 10);
        ctx.strokeRect(canvas.width/2+2, i, 6, 10);
    }

    colorRect(canvas.width/2-11, 0, 4, canvas.height, "white")

    if (showStartScreen || showWinScreen) {

        ctx.globalAlpha = 0.5;
        colorRect(0, 0, canvas.width, canvas.height, "black");
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "white";
        ctx.font = "60px Bangers";
        ctx.strokeStyle="transparent";
        ctx.moveTo(400,20);
        ctx.lineTo(400,170);
        ctx.stroke();

        if (showStartScreen) {
            ctx.textAlign = "center"
            ctx.fillText("Press ENTER to start game", 400, 210);
        }

        if (showWinScreen) {
            if (player1Score >= WINNING_SCORE) {

                ctx.textAlign = "center"
                ctx.fillText(player1Name + " wins!", 400, 160);
                ctx.fillText("Press ENTER for new game", 400, 260);
            } else if (player2Score >= WINNING_SCORE) {

                ctx.textAlign = "center";
                ctx.fillText(player2Name + " wins!", 400, 160);
                ctx.fillText("Press ENTER for new game", 400, 260);
            }
        }

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

    if (player1Score >= WINNING_SCORE) {
        showWinScreen = true;
        cheerSound.play();
    } else if (player2Score >= WINNING_SCORE) {
        showWinScreen = true;
        cheerSound.play();
    }

    ballX = 400;
    ballY = 300;
    ballSpeedX = -ballSpeedX;
}

// function computerMovement() {
//
//     if (player2Y + 100 < ballY) {
//         player2Y += 26;
//     } else if (player2Y - 50 > ballY) {
//         player2Y -= 26;
//     }
// }

function moveEverything() {

    if (showWinScreen) {
        return; // stop the movement
    }

    // computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > player2X) {

        if (ballY > player2Y && ballY < player2Y + 100 && ballX < player2X+20) {
            ballSpeedX = -ballSpeedX;
            ballSound.play();

            var deltaY = ballY - (player2Y + 50)
            ballSpeedY = deltaY * 0.35;
        } else if (ballX > canvas.width) {
            player1Score++; // must be before ballReset()
            player1ScoreHolder.innerHTML = player1Score.toString();
            ballReset();
        }
    } else if (ballX < player1X + 20) {

        if (ballY > player1Y && ballY < player1Y + 100 && ballX > player1X) {
            ballSpeedX = -ballSpeedX;
            ballSound.play();

            var deltaY = ballY - (player1Y + 50)
            ballSpeedY = deltaY * 0.35;
        } else if (ballX < 0) {
            player2Score++; // must be before ballReset()
            player2ScoreHolder.innerHTML = player2Score.toString();
            ballReset();
        }
    } else if (ballY > canvas.height-10 && ballSpeedY > 0.0) { // edge stuck fix
        ballSpeedY = -ballSpeedY;
    } else if (ballY < 10 && ballSpeedY < 0.0) { // edge stuck fix
        ballSpeedY = -ballSpeedY;
    }

    // Controller button pressed
    if (keyHeldUpP1) {
        player1Y -= player1Speed;
    }
    if (keyHeldDownP1) {
        player1Y += player1Speed;
    }
    if (keyHeldUpP2) {
        player2Y -= player2Speed;
    }
    if (keyHeldDownP2) {
        player2Y += player2Speed;
    }

};
