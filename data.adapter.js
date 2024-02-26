import {EVENTS} from "./back/EVENTS.js";

let listeners = {
    [EVENTS.SCORE_CHANGED]: [],
    [EVENTS.GOOGLE_JUMPED]: [],
    [EVENTS.PLAYER1_MOVED]: [],
    [EVENTS.PLAYER2_MOVED]: [],
    [EVENTS.GAME_STATUS_CHANGED]: []
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

export async function getGameStatus () {
    const rawResult = await fetch('http://localhost:3001/game-status')
    const data = await rawResult.json();
    return data.status;
}

export function getScore () {}

export function getGridSize () {}

export function getPlayer1Position () {}

export function getPlayer2Position () {}

export function getGoogleCoordinates () {}

export function movePlayer1Down () {}

export function movePlayer1Left () {}

export function movePlayer1Right () {}

export function movePlayer1Up () {}

export function movePlayer2Down () {}

export function movePlayer2Left () {}

export function movePlayer2Right () {}

export function movePlayer2Up () {}

export function restart () {}

export function start () {}
