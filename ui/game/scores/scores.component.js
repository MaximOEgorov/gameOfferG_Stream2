import { getGoogleCoordinates, getScore, subscribe } from "../../../data/game.data.js";
export function Scores() {

    subscribe(() => {
        containerElement.innerHTML = '';
        update(containerElement);
    })

    const containerElement = document.createElement('div');
    update(containerElement);

    return containerElement;
}

function update(containerElement) {
    const score = getScore();
    const googleCoordinates = getGoogleCoordinates();
    containerElement.append('Player1 points: ' + score.player1Points + '; Player2 points: ' + score.player2Points + '; miss: ' + score.missPoints + ' coords: '+googleCoordinates.x+' - '+googleCoordinates.y);
}