var leftGamePiece;
var rightGamePiece;

function startGame() {
    myGameArea.start();
    leftGamePiece = new component(20, 80, "#fff", 50, 160);
    rightGamePiece = new component(20, 80, "#fff", 730, 160)
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function () {
        var borderBottom = myGameArea.canvas.height - this.height;
        if (this.y > borderBottom) {
            this.y = borderBottom;
        }
    }
    this.hitTop = function () {
        var borderTop = myGameArea.canvas.height - this.height;
        if (this.y < borderTop) {
            this.y = borderTop;
        }
    }
}

function updateGameArea() {
    myGameArea.clear(); leftGamePiece.newPos();
    leftGamePiece.update();
    rightGamePiece.newPos();
    rightGamePiece.update();
}

function stopMove() {
    leftGamePiece.speedY = 0;
    rightGamePiece.speedY = 0;
}

function moveUpLeft() {
    leftGamePiece.speedY -= 5;
}

function moveUpRight() {
    rightGamePiece.speedY -= 5;
}

function moveDownLeft() {
    leftGamePiece.speedY += 5;
}

function moveDownRight() {
    rightGamePiece.speedY += 5;
}
