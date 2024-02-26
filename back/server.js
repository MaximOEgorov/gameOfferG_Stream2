import express from 'express';
import cors from 'cors';

import {
    start,
    subscribe,
    getGoogleCoordinates,
    getPlayer1Position, getPlayer2Position, getScore, getGridSize, getGameStatus, unsubscribe
} from "./game.data.js";
import {EVENTS} from "./EVENTS.js";

const app = express();
app.use(cors());
const PORT = 3001;

/*
function prepareAllData() {
    const fullData = {
        googlePosition: getGoogleCoordinates(),
        player1Position: getPlayer1Position(),
        player2Position: getPlayer2Position(),
        scores: getScore(),
        gridSize: getGridSize(),
        gameStatus: getGameStatus()
    }
    return fullData;
}
*/

app.get('/game-status', (req, res) => {
  res.send({status: getGameStatus()});
})

app.get('/scores', (req, res) => {
    res.send(getScore());
})

app.get('/grid-size', (req, res) => {
    res.send(getGridSize());
})

app.get('/google-position', (req, res) => {
    res.send(getGoogleCoordinates());
})

app.get('/player1-position', (req, res) => {
    res.send(getPlayer1Position());
})

app.get('/player2-position', (req, res) => {
    res.send(getPlayer2Position());
})

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const GOOGLE_JUMPED_subscriber = () => {
        res.write("data: "+EVENTS.GOOGLE_JUMPED+"\n\n");
    };

    subscribe(EVENTS.GOOGLE_JUMPED, GOOGLE_JUMPED_subscriber);

    req.on('close', () => {
        unsubscribe(EVENTS.GOOGLE_JUMPED, GOOGLE_JUMPED_subscriber);
        res.end();
    })
});

app.listen(PORT, () => {
//    setSystemGameMode(GAME_SYSTEM_MODES.SERVER);
    start();
    console.log(`Сервер запущен на порту ${PORT}`);
});