import express from 'express';
import cors from 'cors';

import {
    start,
    subscribe,
    getGoogleCoordinates,
    getPlayer1Position, getPlayer2Position, getScore, getGridSize, getGameStatus
} from "./game.data.js";
import {EVENTS} from "./EVENTS.js";

const app = express();
app.use(cors());
const PORT = 3001;

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

app.get('/game-status', (req, res) => {
  res.send({status: getGameStatus()});
})

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    subscribe(EVENTS.GOOGLE_JUMPED, () => {
        const data = prepareAllData();
        res.write(JSON.stringify(data));
    })
});

app.listen(PORT, () => {
//    setSystemGameMode(GAME_SYSTEM_MODES.SERVER);
    start();
    console.log(`Сервер запущен на порту ${PORT}`);
});