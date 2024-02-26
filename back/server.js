import express from 'express';
import cors from 'cors';

import {
    start,
    subscribe,
    getGoogleCoordinates,
    getPlayer1Position,
    getPlayer2Position,
    getScore,
    getGridSize,
    getGameStatus,
    unsubscribe,
    movePlayer1Right, movePlayer1Left, movePlayer1Up, movePlayer1Down,
    movePlayer2Right, movePlayer2Left, movePlayer2Up, movePlayer2Down
} from "./game.data.js";
import {EVENTS} from "./EVENTS.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

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

app.put('/player1-position', (req, res) => {
    switch (req.body.dir) {
        case 'r' :
            movePlayer1Right();
            break;
        case 'l' :
            movePlayer1Left();
            break;
        case 'u' :
            movePlayer1Up();
            break;
        case 'd' :
            movePlayer1Down();
            break;
    }
    res.end();
})

app.put('/player2-position', (req, res) => {
    switch (req.body.dir) {
        case 'r' :
            movePlayer2Right();
            break;
        case 'l' :
            movePlayer2Left();
            break;
        case 'u' :
            movePlayer2Up();
            break;
        case 'd' :
            movePlayer2Down();
            break;
    }
    res.end();
})

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const subscriberFactory = (eventName) => {
        const subscriber = () => {
            res.write("data: " + eventName + "\n\n");
        }
        return subscriber;
    }

    const GOOGLE_JUMPED_subscriber = subscriberFactory(EVENTS.GOOGLE_JUMPED);
    const SCORE_CHANGED_subscriber = subscriberFactory(EVENTS.SCORE_CHANGED);
    const PLAYER1_MOVED_subscriber = subscriberFactory(EVENTS.PLAYER1_MOVED);
    const PLAYER2_MOVED_subscriber = subscriberFactory(EVENTS.PLAYER2_MOVED);
    const GAME_STATUS_CHANGED_subscriber = subscriberFactory(EVENTS.GAME_STATUS_CHANGED);

    subscribe(EVENTS.GOOGLE_JUMPED, GOOGLE_JUMPED_subscriber);
    subscribe(EVENTS.SCORE_CHANGED, SCORE_CHANGED_subscriber);
    subscribe(EVENTS.PLAYER1_MOVED, PLAYER1_MOVED_subscriber);
    subscribe(EVENTS.PLAYER2_MOVED, PLAYER2_MOVED_subscriber);
    subscribe(EVENTS.GAME_STATUS_CHANGED, GAME_STATUS_CHANGED_subscriber);

    req.on('close', () => {
        unsubscribe(EVENTS.GOOGLE_JUMPED, GOOGLE_JUMPED_subscriber);
        unsubscribe(EVENTS.SCORE_CHANGED, SCORE_CHANGED_subscriber);
        unsubscribe(EVENTS.PLAYER1_MOVED, PLAYER1_MOVED_subscriber);
        unsubscribe(EVENTS.PLAYER2_MOVED, PLAYER2_MOVED_subscriber);
        unsubscribe(EVENTS.GAME_STATUS_CHANGED, GAME_STATUS_CHANGED_subscriber);
        res.end();
    })
});

app.listen(PORT, () => {
//    setSystemGameMode(GAME_SYSTEM_MODES.SERVER);
    start();
    console.log(`Сервер запущен на порту ${PORT}`);
});