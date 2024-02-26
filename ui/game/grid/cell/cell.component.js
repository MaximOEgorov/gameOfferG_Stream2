import {Google, Player1, Player2} from "./google/google.component.js";
import {
    subscribe, unsubscribe,
    getGoogleCoordinates, getPlayer1Position,
    getPlayer2Position} from "../../../../data.adapter.js";
import {EVENTS} from "../../../../back/EVENTS.js";

export function Cell(x, y) {
    const cellElement = document.createElement("td");
    let prevState = 'empty';

    function getCurrentState() {
        if (x === getGoogleCoordinates().x && y === getGoogleCoordinates().y) {
            return 'google';
        } else if (x === getPlayer1Position().x && y === getPlayer1Position().y) {
            return 'player1';
        } else if (x === getPlayer2Position().x && y === getPlayer2Position().y) {
            return 'player2';
        } else return 'empty';
    }

    function render() {
        cellElement.innerHTML = '';
        const currentState = getCurrentState();

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

    render();

    return cellElement;
}

