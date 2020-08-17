const { kingFactory, knightFactory, pawnFactory, bishopFactory, rookFactory } = require('./pieceDefinitions')

function makeBoard(pieces, board) {
    pieces.length = 0;
    board.length = 0;
    for (let x = 1; x <= 8; x++) {
        for (let y = 1; y <= 8; y++) {
            board.push({ light: false, x: x, y: y })
        }
    }
    pieces.push(kingFactory('black', 1, 8), kingFactory('white', 1, 1))

    for (let i = 2; i <= 16; i++) {
        placeRandomPieces(pieces, i);
    }
}

function placeRandomPieces(pieces, next) {
    const which = getRndInteger(1, 9)

    let blackNext = {
        x: next,
        y: 8
    };

    let whiteNext = {
        x: next,
        y: 1
    }
    if (next > 8) {
        blackNext.x -= 8;
        whiteNext.x -= 8;
        blackNext.y = 7;
        whiteNext.y = 2;
    }

    switch (which) {
        case 1:
            pieces.push(
                pawnFactory('black', blackNext.x, blackNext.y),
                pawnFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 2:
            pieces.push(
                bishopFactory('black', blackNext.x, blackNext.y),
                bishopFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 3:
            pieces.push(
                rookFactory('black', blackNext.x, blackNext.y),
                rookFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 4:
            pieces.push(
                bishopFactory('black', blackNext.x, blackNext.y),
                bishopFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 5:
            pieces.push(
                knightFactory('black', blackNext.x, blackNext.y),
                knightFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 6:
            pieces.push(
                knightFactory('black', blackNext.x, blackNext.y),
                knightFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 7:
            pieces.push(
                pawnFactory('black', blackNext.x, blackNext.y),
                pawnFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 8:
            pieces.push(
                pawnFactory('black', blackNext.x, blackNext.y),
                pawnFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
        case 9:
            pieces.push(
                pawnFactory('black', blackNext.x, blackNext.y),
                pawnFactory('white', whiteNext.x, whiteNext.y)
            )
            break;
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.makeBoard = makeBoard;