const BRICK_W = 50;
const BRICK_H = 50;
const BRICK_GAP = 0;
const BRICK_COLS = 16;
const BRICK_ROWS = 12;
// var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var brickGrid = [
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];

// function resetBricks() {
//
//     for (var i = 0; i < brickGrid.length; i++) {
//         brickGrid[i] = true;
//     }
// }

function brickTileToIndex(tileCol, tileRow) {

    return (BRICK_COLS * tileRow + tileCol);
}

function brickIsAtCoord(brickTileCol, brickTileRow) {

    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] == 1);
}

function drawBricks() {

    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {

        for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {

            if (brickIsAtCoord(eachCol, eachRow)) {

                var brickLeftEdgeX = eachCol * BRICK_W;
                var brickLeftEdgeY = eachRow * BRICK_H;
                colorRect(brickLeftEdgeX, brickLeftEdgeY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, "goldenrod");

            }
        }
    }
}

function brickCollision() {

    var tileCol = ballX / BRICK_W;
    var tileRow = ballY / BRICK_H;

    // round to the nearest integer
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    if (tileCol < 0 || tileCol >= BRICK_COLS ||
        tileRow < 0 || tileRow >= BRICK_ROWS) {

        return;
    }

    var brickIndex = brickTileToIndex(tileCol, tileRow);

    if (brickGrid[brickIndex] == 1) {

        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevTileCol = Math.floor(prevBallX / BRICK_W);
        var prevTileRow = Math.floor(prevBallY / BRICK_H);

        var bothTestsFailed = true;

        if (prevTileCol != tileCol) {

            var adjBrickIndex = brickTileToIndex(prevTileCol, tileRow);

            if (brickGrid[adjBrickIndex] != 1) {

                ballSpeedX *= -1;
                bothTestsFailed = false;
            }
        }

        if (prevTileRow != tileRow) {
            ballSpeedY *= -1;
        }

    }
}
