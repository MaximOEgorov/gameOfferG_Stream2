import {Game} from './ui/game/game.component.js'
import {Win} from "./ui/game/win/win.component.js";
import {
    subscribe,
    unsubscribe,
    getGameStatus,
    movePlayer1Down,
    movePlayer1Left,
    movePlayer1Right,
    movePlayer1Up,
    movePlayer2Down,
    movePlayer2Left,
    movePlayer2Right,
    movePlayer2Up, start
} from "./data.adapter.js";
import {EVENTS} from "./back/EVENTS.js";
import {GAME_STATUSES} from "./back/GAME_STATUSES.js";

function renderApp() {
    subscribe(EVENTS.GAME_STATUS_CHANGED, () => {
        render();
    })

    async function render() {
        document.body.innerHTML = "";
        const gameStatus = await getGameStatus();
        if (gameStatus === GAME_STATUSES.WIN) {
            const WinEl = await Win();
            document.body.append(WinEl);
        } else {
            const gameEl = await Game();
            document.body.append(gameEl);
        }
    }

    render();
    start();
}

renderApp();

window.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowUp':
            movePlayer1Up();
            break;
        case 'ArrowDown':
            movePlayer1Down();
            break;
        case 'ArrowLeft':
            movePlayer1Left();
            break;
        case 'ArrowRight':
            movePlayer1Right();
            break;
        case 'KeyW':
            movePlayer2Up();
            break;
        case 'KeyS':
            movePlayer2Down();
            break;
        case 'KeyA':
            movePlayer2Left();
            break;
        case 'KeyD':
            movePlayer2Right();
            break;
    }
})

