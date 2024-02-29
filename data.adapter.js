import {EVENTS} from "./back/EVENTS.js";

let listeners = {
    [EVENTS.SCORE_CHANGED]: [],
    [EVENTS.GOOGLE_JUMPED]: [],
    [EVENTS.PLAYER1_MOVED]: [],
    [EVENTS.PLAYER2_MOVED]: [],
    [EVENTS.GAME_STATUS_CHANGED]: []
};

const eventSource = new EventSource('http://localhost:3001/events');
eventSource.onmessage = function (event) {
    _notify(event.data);
};

export function subscribe(eventName, observer) {
    listeners[eventName].push(observer);
}

export function unsubscribe(eventName, observer) {
    listeners[eventName] = listeners[eventName].filter(o => o !== observer);
}

function _notify(eventName) {
    listeners[eventName].forEach((subscriber) => {
        try {
            subscriber()
        } catch (error) {
            console.log('ERROR occurs inside ' + subscriber.name);
        }
    });
}

export async function getGameStatus() {
    const rawResult = await fetch('http://localhost:3001/game-status')
    const data = await rawResult.json();
    return data.status;
}

export async function getScore() {
    const rawResult = await fetch('http://localhost:3001/scores')
    const data = await rawResult.json();
    return data;
}

export async function getGridSize() {
    const rawResult = await fetch('http://localhost:3001/grid-size')
    const data = await rawResult.json();
    return data;
}

export async function getPlayer1Position() {
    const rawResult = await fetch('http://localhost:3001/player1-position')
    const data = await rawResult.json();
    return data;
}

export async function getPlayer2Position() {
    const rawResult = await fetch('http://localhost:3001/player2-position')
    const data = await rawResult.json();
    return data;
}

export async function getGoogleCoordinates() {
    const rawResult = await fetch('http://localhost:3001/google-position')
    const data = await rawResult.json();
    return data;
}

function movePlayer1(_dir) {
    fetch('http://localhost:3001/player1-position',
        {
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dir: _dir})
        });
}

function movePlayer2(_dir) {
    fetch('http://localhost:3001/player2-position',
        {
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dir: _dir})
        });
}

export function movePlayer1Down() {
    movePlayer1('d');
}

export function movePlayer1Left() {
    movePlayer1('l');
}

export function movePlayer1Right() {
    movePlayer1('r');
}

export function movePlayer1Up() {
    movePlayer1('u');
}

export function movePlayer2Down() {
    movePlayer2('d');
}

export function movePlayer2Left() {
    movePlayer2('l');
}

export function movePlayer2Right() {
    movePlayer2('r');
}

export function movePlayer2Up() {
    movePlayer2('u');
}

export function restart() {
    fetch('http://localhost:3001/restart-game',
        {
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({restart: true})
        });
}

export function start() {
}
