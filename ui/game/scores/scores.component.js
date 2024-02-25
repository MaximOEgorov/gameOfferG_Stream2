import {getScore, subscribe} from "../../../data/game.data.js";

export function Scores() {
    const containerElement = document.createElement('div');
    let prevState = {};

    subscribe(() => {
        if (prevState !== getScore()) {
            render(containerElement);
        }
    })

    function render() {
        const score = getScore();
        containerElement.innerHTML = '';
        containerElement.append('Player1 points: ' + score.player1Points + '; Player2 points: ' + score.player2Points + '; miss: ' + score.missPoints);
        prevState = score;
    }

    render();
    return containerElement;

}