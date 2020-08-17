

function knightFactory(color, x, y) {
    return {
        icon: color + 'Knight.svg',
        moves: [{ type: 'absolute', y: 2, x: 1 }, { type: 'absolute', y: 2, x: -1 },
        { type: 'absolute', y: -2, x: 1 }, { type: 'absolute', y: -2, x: -1 },
        { type: 'absolute', y: 1, x: 2 }, { type: 'absolute', y: 1, x: -2 },
        { type: 'absolute', y: -1, x: 2 }, { type: 'absolute', y: -1, x: -2 }],
        x: x,
        y: y,
        color: color
    }
}

function pawnFactory(color, x, y) {
    let moves = [{ type: 'absolute', impotent: true, y: 1, x: 0 }, { type: 'takeMove', y: 1, x: -1 }, { type: 'takeMove', y: 1, x: 1 }];

    if (color == 'black') {
        moves = [{ type: 'absolute', impotent: true, y: -1, x: 0 }, { type: 'takeMove', y: -1, x: -1 }, { type: 'takeMove', y: -1, x: 1 }]
    }

    return {
        icon: color + 'Pawn.svg',
        moves: moves,
        x: x,
        y: y,
        moved: false,
        color: color,
        conditionalMoves: function (state) {
            if (!this.moved) {
                if (this.color == 'black') {
                    return [{ type: 'blockable', repeat: true, limit: 2, y: -1, x: 0, impotent: true }]
                }
                else if (this.color == 'white') {
                    return [{ type: 'blockable', limit: 2, repeat: true, y: 1, x: 0, impotent: true }]
                }
            }
            else {
                return [];
            }
        },
        afterPlayerMove: function (state, move) {
            if (!this.moved) {
                this.moved = true;
            }
            if (color == 'black' && state.pieceSelected.y == 1) {
                this.icon = color + 'Queen.svg';
                this.moves.length = 0;
                this.moves.push({ type: 'blockable', repeat: true, x: 0, y: -1 }, { type: 'blockable', repeat: true, x: 0, y: 1 },
                    { type: 'blockable', repeat: true, x: -1, y: 0 }, { type: 'blockable', repeat: true, x: 1, y: 0 },
                    { type: 'blockable', repeat: true, x: -1, y: -1 }, { type: 'blockable', repeat: true, x: 1, y: 1 },
                    { type: 'blockable', repeat: true, x: -1, y: 1 }, { type: 'blockable', repeat: true, x: 1, y: -1 })
            }
            else if (color == 'white' && state.pieceSelected.y == 8) {
                this.icon = color + 'Queen.svg';
                this.moves.length = 0;
                this.moves.push({ type: 'blockable', repeat: true, x: 0, y: -1 }, { type: 'blockable', repeat: true, x: 0, y: 1 },
                    { type: 'blockable', repeat: true, x: -1, y: 0 }, { type: 'blockable', repeat: true, x: 1, y: 0 },
                    { type: 'blockable', repeat: true, x: -1, y: -1 }, { type: 'blockable', repeat: true, x: 1, y: 1 },
                    { type: 'blockable', repeat: true, x: -1, y: 1 }, { type: 'blockable', repeat: true, x: 1, y: -1 })
            }
        }
    }
}

function bishopFactory(color, x, y) {
    return {
        icon: color + 'Bishop.svg',
        moves: [{ type: 'blockable', repeat: true, x: -1, y: -1 }, { type: 'blockable', repeat: true, x: 1, y: 1 },
        { type: 'blockable', repeat: true, x: -1, y: 1 }, { type: 'blockable', repeat: true, x: 1, y: -1 }],
        x: x,
        y: y,
        color: color
    }
}

function rookFactory(color, x, y) {
    return {
        icon: color + 'Rook.svg',
        moves: [{ type: 'blockable', repeat: true, x: 0, y: -1 }, { type: 'blockable', repeat: true, x: 0, y: 1 },
        { type: 'blockable', repeat: true, x: -1, y: 0 }, { type: 'blockable', repeat: true, x: 1, y: 0 }],
        x: x,
        y: y,
        color: color
    }
}

function queenFactory(color, x, y) {
    return {
        icon: color + 'Queen.svg',
        moves: [{ type: 'blockable', repeat: true, x: 0, y: -1 }, { type: 'blockable', repeat: true, x: 0, y: 1 },
        { type: 'blockable', repeat: true, x: -1, y: 0 }, { type: 'blockable', repeat: true, x: 1, y: 0 },
        { type: 'blockable', repeat: true, x: -1, y: -1 }, { type: 'blockable', repeat: true, x: 1, y: 1 },
        { type: 'blockable', repeat: true, x: -1, y: 1 }, { type: 'blockable', repeat: true, x: 1, y: -1 }],
        x: x,
        y: y,
        color: color
    }
}

function kingFactory(color, x, y) {
    return {
        icon: color + 'King.svg',
        moves: [{ type: 'absolute', x: 0, y: -1 }, { type: 'absolute', x: 0, y: 1 },
        { type: 'absolute', x: -1, y: 0 }, { type: 'absolute', x: 1, y: 0 },
        { type: 'absolute', x: -1, y: -1 }, { type: 'absolute', x: 1, y: 1 },
        { type: 'absolute', x: -1, y: 1 }, { type: 'absolute', x: 1, y: -1 }],
        x: x,
        y: y,
        color: color,
        afterThisPieceTaken: function (state) {
            if (this.color == 'white') {
                state.won = 'black';
            }
            else if (this.color == 'black') {
                state.won = 'white';
            }
        }
    }
}

module.exports = {
    kingFactory: kingFactory,
    pawnFactory: pawnFactory,
    knightFactory: knightFactory,
    rookFactory: rookFactory,
    queenFactory: queenFactory,
    bishopFactory: bishopFactory

}