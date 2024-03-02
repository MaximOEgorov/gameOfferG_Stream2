import {
    getGoogleCoordinates,
    getGridSize, getPlayer1Position, getPlayer2Position,
    subscribe,
} from "../../../data.adapter.js";
import {Cell} from "./cell/cell.component.js";
import {EVENTS} from "../../../back/EVENTS.js";

async function getCurrentState() {
    const googlePosition = await getGoogleCoordinates();
    const player1Position = await getPlayer1Position();
    const player2Position = await getPlayer2Position();
    console.log(JSON.stringify(player1Position))
    return {
        googlePosition: googlePosition,
        player1Position: player1Position,
        player2Position: player2Position,
    }
}

export async function GameGrid() {
    const containerElement = document.createElement("table");
    subscribe(EVENTS.GOOGLE_JUMPED, () => {
        render(containerElement)
    });
    subscribe(EVENTS.PLAYER1_MOVED, () => {
        render(containerElement)
    });
    subscribe(EVENTS.PLAYER2_MOVED, () => {
        render(containerElement)
    });

    let prevState = {}

    async function render(containerEl) {
        const gridSize = await getGridSize();
        const CurrentState = await getCurrentState();
        if(prevState.player2Position){
            console.log(JSON.stringify(CurrentState.player2Position) === JSON.stringify(prevState.player2Position))

        }
        containerEl.innerHTML = "";
        for (let y = 0; y < gridSize.rowsCount; y++) {
            const row = document.createElement("tr");

            for (let x = 0; x < gridSize.columnsCount; x++) {
                let imgRole = 'empty';
                if (x === CurrentState.googlePosition.x && y === CurrentState.googlePosition.y) {
                    imgRole = 'google';
                } else if (x === CurrentState.player1Position.x && y === CurrentState.player1Position.y) {
                    imgRole = 'player1';
                } else if (x === CurrentState.player2Position.x && y === CurrentState.player2Position.y) {
                    imgRole = 'player2';
                }
                const cell = Cell(x, y, imgRole);

                row.append(cell);
            }
            containerEl.append(row);
        }
        prevState = CurrentState
    }

    render(containerElement);
    return containerElement;

}