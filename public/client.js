const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const socket = io();
let mouseX,mouseY;

const bBishop = new Image();
bBishop.src = '/static/blackBishop.svg';

const wBishop = new Image();
wBishop.src = '/static/whiteBishop.svg';

const bKnight = new Image();
bKnight.src = '/static/blackKnight.svg';

const wKnight = new Image();
wKnight.src = '/static/whiteKnight.svg';

const bRook = new Image();
bRook.src = '/static/blackRook.svg';

const wRook = new Image();
wRook.src = '/static/whiteRook.svg';

const bKing = new Image();
bKing.src = '/static/blackKing.svg';

const wKing = new Image();
wKing.src = '/static/whiteKing.svg';

const bPawn = new Image();
bPawn.src = '/static/blackPawn.svg';

const wPawn = new Image();
wPawn.src = '/static/whitePawn.svg';

const bQueen = new Image();
bQueen.src = '/static/blackQueen.svg';

const wQueen = new Image();
wQueen.src = '/static/whiteQueen.svg';
var st = undefined;

socket.on('returnState', (state) => {
    //Draw the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (state.won) {
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';

        if (state.won == 'black') {
            ctx.fillText("Black Won", 10, 50);
        }
        else if (state.won == 'white') {
            ctx.fillText("White Won", 10, 50);
        }
    }
    else if (state.pieces) {
        //Draw Squares
        state.board.forEach((sq) => {
            if (!sq.light) {
                drawWhiteSquare(sq.x * 50, sq.y * 50)
            }
            else {
                drawLightedSquare(sq.x * 50, sq.y * 50);
            }
        })
        //Draw Pieces
        state.pieces.forEach((piece) => {
            drawPiece(piece.x, piece.y, piece.icon)
        })
    }
    else {
        ctx.font = "30px Arial";
        ctx.fillText("Waiting For Worthy Opponent", 10, 50);
        // Waiting For Opponent
    }
})

function drawWhiteSquare(x, y) {
    ctx.beginPath();
    ctx.rect(x, y, 50, 50);
    ctx.stroke();
}

function drawLightedSquare(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.fillRect(x, y, 50, 50);
    ctx.stroke();
}

function drawPiece(x, y, img) {
    switch (img) {
        case 'blackBishop.svg':
            ctx.drawImage(bBishop, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'whiteBishop.svg':
            ctx.drawImage(wBishop, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'blackKnight.svg':
            ctx.drawImage(bKnight, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'whiteKnight.svg':
            ctx.drawImage(wKnight, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'blackRook.svg':
            ctx.drawImage(bRook, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'whiteRook.svg':
            ctx.drawImage(wRook, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'blackPawn.svg':
            ctx.drawImage(bPawn, 0, 0, 35, 35, x * 50, y * 50, 35, 35);
            break;
        case 'whitePawn.svg':
            ctx.drawImage(wPawn, 0, 0, 35, 35, x * 50, y * 50, 35, 35);
            break;
        case 'blackQueen.svg':
            ctx.drawImage(bQueen, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'whiteQueen.svg':
            ctx.drawImage(wQueen, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'blackKing.svg':
            ctx.drawImage(bKing, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
        case 'whiteKing.svg':
            ctx.drawImage(wKing, 0, 0, 50, 50, x * 50, y * 50, 50, 50);
            break;
    }
}

canvas.addEventListener('click', (e) => {
    var element = canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset. It's possible to cache this if you want
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    socket.emit('move', { x: parseInt(mx / 50), y: parseInt(my / 50) })
})