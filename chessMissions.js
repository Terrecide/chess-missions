const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const newG = require('./globby').newIOServer;
const makeBoard = require('./boardGeneration').makeBoard
const { selectPiece, playerMove, checkTurn, changeTurn, lightBoard, closeLights } = require('./selectAndMovemethods')

app.use('/static', express.static('public'))

newG({
    baseState: {
        //Starting State
        board: [],
        pieceSelected: undefined,
        turn: 'white',
        white: undefined,
        black: undefined,
        pieces: [],
        won: undefined
    },
    moveFunction: function (player, move, state) {
        const cont = checkTurn(state, player.ref);
        if (!cont) {
            return
        }
        if (state.pieceSelected) {
            if (playerMove(move, state)) {
                changeTurn(state)
            }
            else {
                closeLights(state.board);
                state.pieceSelected = undefined;
            }
        }
        else {
            selectPiece(move, state)
            if (state.pieceSelected) {
                lightBoard(state.pieceSelected, state)
            }
        }
    },
    maxPlayers: 2, // Number of Players you want in a single game

    startBlockerFunction: function (minPlayers, maxPlayers, currentPlayers, state) {
        if (currentPlayers.length >= minPlayers) {
            return undefined;
        }
        else {
            return { message: "Waiting for opponent" };
        }
    },
    joinBlockerFunction: function (minPlayers, maxPlayers, currentPlayers, state) {
        //Return true if you want to allow join and false if you don't want to
        if (currentPlayers.length < minPlayers) {
            return true;
        }
        return false;
    },
    connectFunction: function (state, playerRef) {
        if (!state.white) {
            state.white = playerRef;
        }
        else if (!state.black) {
            state.black = playerRef;
            makeBoard(state.pieces, state.board);
        }
    },
},
    io)


app.get('/', function (req, res) {
    return res.status(200).sendFile(__dirname + '/chessMissions.html');
});


http.listen(3007, function () {
    console.log('listening on *:3007');
});