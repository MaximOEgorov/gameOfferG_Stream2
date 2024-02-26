import {subscribe, getScore} from "../../../data.adapter.js";
import {EVENTS} from "../../../back/EVENTS.js";

export async function Scores() {
    const containerElement = document.createElement('div');
    let prevState = {};

    subscribe(EVENTS.SCORE_CHANGED, () => {
        render(containerElement);
    })

    async function render() {
        const score = await getScore();
        containerElement.innerHTML = '';
        containerElement.append('Player1 points: ' + score.player1Points + '; Player2 points: ' + score.player2Points + '; miss: ' + score.missPoints);
        prevState = score;
    }

    render();
    return containerElement;

}