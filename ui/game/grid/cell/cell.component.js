import {Google, Player1, Player2} from "./google/google.component.js";
import {
    subscribe, unsubscribe,
    getGoogleCoordinates, getPlayer1Position,
    getPlayer2Position} from "../../../../data.adapter.js";
import {EVENTS} from "../../../../back/EVENTS.js";

export async function Cell(x, y) {
    const cellElement = document.createElement("td");
    let prevState = 'empty';

    async function getCurrentState() {
        const googlePosition = await getGoogleCoordinates();
        const player1Position = await getPlayer1Position();
        const player2Position = await getPlayer2Position();
        if (x === googlePosition.x && y === googlePosition.y) {
            return 'google';
        } else if (x === player1Position.x && y === player1Position.y) {
            return 'player1';
        } else if (x === player2Position.x && y === player2Position.y) {
            return 'player2';
        } else return 'empty';
    }

    async function render() {
        cellElement.innerHTML = '';
        const currentState = await getCurrentState();

        unsubscribe(EVENTS.GOOGLE_JUMPED, render);
        unsubscribe(EVENTS.PLAYER1_MOVED, render);
        unsubscribe(EVENTS.PLAYER2_MOVED, render);

        switch (currentState) {
            case 'google':
                subscribe(EVENTS.GOOGLE_JUMPED, render);
                cellElement.append(Google());
                break;
            case 'player1':
                subscribe(EVENTS.PLAYER1_MOVED, render);
                cellElement.append(Player1());
                break;
            case 'player2':
                subscribe(EVENTS.PLAYER2_MOVED, render);
                cellElement.append(Player2());
                break;
            case 'empty':
                subscribe(EVENTS.GOOGLE_JUMPED, render);
                subscribe(EVENTS.PLAYER1_MOVED, render);
                subscribe(EVENTS.PLAYER2_MOVED, render);
                break;
        }
        prevState = currentState;
    }

    await render();

    return cellElement;
}

