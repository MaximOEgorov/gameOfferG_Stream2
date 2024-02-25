import {
    getGoogleCoordinates, getPlayer1Position, getPlayer2Position, subscribe
} from "../../../../data/game.data.js";
import {Google, Player1, Player2} from "./google/google.component.js";

export function Cell(x, y) {
    const cellElement = document.createElement("td");

    function render () {
        const googlePosition = getGoogleCoordinates();
        const Player1Position = getPlayer1Position();
        const Player2Position = getPlayer2Position();

        cellElement.innerHTML = '';

        if (x === googlePosition.x && y === googlePosition.y) {
            cellElement.append(Google());
        }

        if (x === Player1Position.x && y === Player1Position.y) {
            cellElement.append(Player1());
        }

        if (x === Player2Position.x && y === Player2Position.y) {
            cellElement.append(Player2());
        }
    }

    subscribe(render);

    render();

    return cellElement;
}

