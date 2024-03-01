import {Google, Player1, Player2} from "./google/google.component.js";

export function Cell(x, y, imgRole) {
    const cellElement = document.createElement("td");

    switch (imgRole) {
        case 'google':
            cellElement.append(Google());
            break;
        case 'player1':
            cellElement.append(Player1());
            break;
        case 'player2':
            cellElement.append(Player2());
            break;
        case 'empty':
            break;
    }

    return cellElement;
}

