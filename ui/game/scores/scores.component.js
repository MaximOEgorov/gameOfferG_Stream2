import {subscribe, getScore} from "../../../data.adapter.js";
import {EVENTS} from "../../../back/EVENTS.js";

export function Scores() {
    const containerElement = document.createElement('div');
    let prevState = {};

    subscribe(EVENTS.SCORE_CHANGED, () => {
        render(containerElement);
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