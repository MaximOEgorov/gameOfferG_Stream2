import {
    EVENTS,
    getGoogleCoordinates, getPlayer1Position, getPlayer2Position, subscribe
} from "../../../../data/game.data.js";
import {Google, Player1, Player2} from "./google/google.component.js";

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
        switch (currentState) {
            case 'google':
                cellElement.append(Google());
                break;
            case 'player1':
                cellElement.append(Player1());
                break;
            case 'player2':
                cellElement.append(Player2());
                break;
        }
        prevState = currentState;
    }

    subscribe(EVENTS.GOOGLE_JUMPED, ()=>{
        const currentState = getCurrentState();
        if (currentState !== prevState) {
            render();
        }
    });

    subscribe(EVENTS.PLAYER1_MOVED, ()=>{
        const currentState = getCurrentState();
        if (currentState !== prevState) {
            render();
        }
    });

    subscribe(EVENTS.PLAYER2_MOVED, ()=>{
        const currentState = getCurrentState();
        if (currentState !== prevState) {
            render();
        }
    });

    render();

    return cellElement;
}

