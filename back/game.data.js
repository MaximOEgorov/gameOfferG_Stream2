import {EVENTS} from "./EVENTS.js";
import {GAME_STATUSES} from "./GAME_STATUSES.js";

const data = {
    catchPoints: 0,
    missPoints: 0,
    winPoints: 5,
    win: false,
    x: 0,
    y: 0,
    rowsCount: 5,
    columnsCount: 5,
    players: [
        {x: 0, y: 1, points: 0},
        {x: 3, y: 4, points: 0},
    ],
    systemSettings: {
        mode: null,
    }
};

let listeners = {
    [EVENTS.SCORE_CHANGED]: [],
    [EVENTS.GOOGLE_JUMPED]: [],
    [EVENTS.PLAYER1_MOVED]: [],
    [EVENTS.PLAYER2_MOVED]: [],
    [EVENTS.GAME_STATUS_CHANGED]: []
};

export function setSystemGameMode(mode) {
    data.systemSettings.mode = mode;
}

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

let runGoogleJumpIntervalId = null;

function runGoogleJumpInterval() {
    clearInterval(runGoogleJumpIntervalId);
    runGoogleJumpIntervalId = setInterval(() => {
        _missGoogle();
        changeGoogleCoordinates(true);
        _notify(EVENTS.GOOGLE_JUMPED);
    }, 2000);
}

function changeGoogleCoordinates() {
    let newX = null;
    let newY = null;
    let newCoordsIsEqualOldCoords = null;

    do {
        newX = _getRandom(data.columnsCount);
        newY = _getRandom(data.rowsCount);
        newCoordsIsEqualOldCoords = data.x === newX && data.y === newY;
    }
    while
        (newCoordsIsEqualOldCoords || !isCellOfGridIsFree(newX, newY));

    data.x = newX;
    data.y = newY;
}

function _missGoogle() {
    data.missPoints++;
    changeGoogleCoordinates();
    _notify(EVENTS.SCORE_CHANGED);
}

function _getRandom(N) {
    return Math.floor(Math.random() * N);
}

// setter
export function catchGoogle(player) {
    player.points++;

    if (player.points === data.winPoints) {
        data.win = true;
        clearInterval(runGoogleJumpIntervalId)
        _notify(EVENTS.GAME_STATUS_CHANGED);
    } else {
        changeGoogleCoordinates();
        runGoogleJumpInterval();
        _notify(EVENTS.GOOGLE_JUMPED);
    }
    _notify(EVENTS.SCORE_CHANGED);
}

export function start() {
    runGoogleJumpInterval();
}

export function restart() {
    data.catchPoints = 0;
    data.missPoints = 0;
    data.players[0].points = 0;
    data.players[1].points = 0;
    data.x = 0;
    data.y = 0;
    data.win = false;
    runGoogleJumpInterval();
    _notify(EVENTS.GAME_STATUS_CHANGED);
    _notify(EVENTS.SCORE_CHANGED);
}

function movePlayer(delta, playerIndex) {
    const player = data.players[playerIndex];
    const newX = player.x + delta.x;
    const newY = player.y + delta.y;

    if (!isNewCoordsInsideGrid(newX, newY)) return;
    if (!isCellOfGridIsFree(newX, newY)) return;

    player.x = newX;
    player.y = newY;

    if (player.x === data.x && player.y === data.y) {
        catchGoogle(player)
    }

    _notify(playerIndex === 0 ? EVENTS.PLAYER1_MOVED : EVENTS.PLAYER2_MOVED);
}

function isNewCoordsInsideGrid(x, y) {
    return !(x < 0 ||
        y < 0 ||
        x >= data.columnsCount ||
        y >= data.rowsCount);
}

function isCellOfGridIsFree(newX, newY) {
    if (newX === data.players[0].x && newY === data.players[0].y) return false;
    if (newX === data.players[1].x && newY === data.players[1].y) return false;

    return true;
}

export function movePlayer1Up() {
    movePlayer({x: 0, y: -1}, 0);
}

export function movePlayer1Down() {
    movePlayer({x: 0, y: 1}, 0);
}

export function movePlayer1Left() {
    movePlayer({x: -1, y: 0}, 0);
}

export function movePlayer1Right() {
    movePlayer({x: 1, y: 0}, 0);
}

export function movePlayer2Up() {
    movePlayer({x: 0, y: -1}, 1);
}

export function movePlayer2Down() {
    movePlayer({x: 0, y: 1}, 1);
}

export function movePlayer2Left() {
    movePlayer({x: -1, y: 0}, 1);
}

export function movePlayer2Right() {
    movePlayer({x: 1, y: 0}, 1);
}

// getter

export function getGoogleCoordinates() {
    return {
        x: data.x,
        y: data.y
    }
}

export function getPlayer1Position() {
    return {
        x: data.players[0].x,
        y: data.players[0].y
    }
}

export function getPlayer2Position() {
    return {
        x: data.players[1].x,
        y: data.players[1].y
    }
}

export function getGridSize() {
    return {
        columnsCount: data.columnsCount,
        rowsCount: data.rowsCount
    }
}

export function getScore() {
    return {
        player1Points: data.players[0].points,
        player2Points: data.players[1].points,
        missPoints: data.missPoints
    }
}

export function getGameStatus() {
    if (data.win) return GAME_STATUSES.WIN
    else return GAME_STATUSES.IN_PROGRESS
}


// ui - bll - dal
// solid, grasp, ddd
// чистая архитектура
// архитектура портов и адаптеров
// Мартин Фаулер, Рефакторинг
