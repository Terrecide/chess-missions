
function lightBoard(piece, state) {
    closeLights(state.board);
    if (!piece) {
        return;
    }
    let tempMoves = [];
    if (piece.conditionalMoves) {
        tempMoves = piece.conditionalMoves(state);
    }

    [...piece.moves, ...tempMoves].forEach((move) => {
        if (move.type == 'absolute') {
            const square = state.board.find((el) => {
                return el.x === piece.x + move.x && el.y === piece.y + move.y
            })
            if (square) {
                const innerPiece = pieceFromSquare(square, state.pieces)
                if (innerPiece) {
                    if (innerPiece.color != piece.color && !move.impotent) {
                        square.light = true;
                    }
                }
                else if (!innerPiece) {
                    square.light = true;
                }
            }
        }
        else if (move.type == 'takeMove') {
            const square = state.board.find((el) => {
                return el.x === piece.x + move.x && el.y === piece.y + move.y
            })
            if (square) {
                const innerPiece = pieceFromSquare(square, state.pieces)
                if (innerPiece) {
                    if (innerPiece.color != piece.color && !move.impotent) {
                        square.light = true;
                    }
                }
            }
        }
        else if (move.type == 'blockable') {
            if (move.repeat) {
                const limit = move.limit || 100;
                blockableFunction(state, move.x, move.y, piece.x, piece.y, move, limit);
            }
        }


    })
}

function blockableFunction(state, powerX, powerY, x, y, move, limit) {
    if (limit === 0) {
        return;
    }
    const square = state.board.find((el) => {
        return el.x === x + powerX && el.y === y + powerY;
    })
    if (!square) {
        return;
    }
    const piece = pieceFromSquare(square, state.pieces)

    let directionX = 0;
    if (powerX < 0) {
        directionX = -1;
    }
    else if (powerX > 0) {
        directionX = 1;
    }

    let directionY = 0;

    if (powerY < 0) {
        directionY = -1;
    }
    else if (powerY > 0) {
        directionY = 1;
    }
    else {
        directionY = 0;
    }


    if (!piece) {
        square.light = true;
        blockableFunction(state, powerX + directionX, powerY + directionY, x, y, move, limit - 1)
    }
    else if (piece.color != state.turn && !move.impotent) {
        square.light = true;
    }

    return;
}

function pieceFromSquare(square, pieces) {
    const piece = pieces.find((p) => {
        return square.x === p.x && square.y === p.y;
    })

    return piece;
}

function closeLights(board) {
    board.forEach((square) => {
        square.light = false;
    })
}

function changeTurn(state) {
    if (state.turn == 'white') {
        state.turn = 'black'
    }
    else {
        state.turn = 'white'
    }
}

function checkTurn(state, playerRef) {

    //Return true if it's your turn and false if it's not
    if (state.turn == 'white' && state.white == playerRef || state.turn == 'black' && state.black == playerRef) {
        return true
    }
    return false
}

function playerMove(playerMove, state) {
    // if legal move return true else return false
    const x = playerMove.x;
    const y = playerMove.y;
    const square = state.board.find((sq) => {
        return sq.x === x && sq.y === y;
    })
    if (!square) {
        return false;
    }
    if (!square.light) {
        return false; // Square wasn't lighted in the lightBoard stage so the move is not legal
    }

    const enemyPiece = state.pieces.find((ePiece) => {
        return ePiece.x === x && ePiece.y === y && ePiece.color != state.pieceSelected.color
    })
    if (enemyPiece) {
        if (enemyPiece.afterThisPieceTaken) {
            enemyPiece.afterThisPieceTaken(state)
        }
        if (state.pieceSelected.afterEnemyPieceTaken) {
            state.pieceSelected.afterEnemyPieceTaken(enemyPiece, state);
        }
        enemyPiece.x = undefined;
        enemyPiece.y = undefined;
        state.pieces.splice(state.pieces.indexOf(enemyPiece), 1)
    }

    state.pieceSelected.x = x;
    state.pieceSelected.y = y;
    if (state.pieceSelected.afterPlayerMove) {
        state.pieceSelected.afterPlayerMove(state, playerMove)
    }
    state.pieceSelected = undefined;
    closeLights(state.board)
    state.pieceSelected = undefined;
    return true;
}

function selectPiece(playerMove, state) {
    const x = playerMove.x;
    const y = playerMove.y;


    const piece = state.pieces.find((el) => {
        return x == el.x && y == el.y;
    })
    if (!piece) {
        closeLights(state.board);
        return;
    }

    if (piece.color !== state.turn) {
        closeLights(state.board);
        return;
    }
    state.pieceSelected = piece;
    lightBoard(piece, state)
}

module.exports = {
    selectPiece: selectPiece,
    playerMove: playerMove,
    checkTurn: checkTurn,
    changeTurn: changeTurn,
    lightBoard: lightBoard,
    closeLights: closeLights
}