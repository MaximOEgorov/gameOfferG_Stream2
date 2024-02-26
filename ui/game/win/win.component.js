import {restart, getScore} from "../../../data.adapter.js";

export async function Win() {
    const element = document.createElement('div');
    const score = await getScore();
    element.append(`You win, player1 points: ${score.player1Points}; player2 points: ${score.player2Points}; miss: ${score.missPoints}`)
    const restartButton = RestartButton();
    element.append(restartButton)

    return element
}

export function RestartButton() {
    const element = document.createElement('button');
    element.innerHTML = 'RESTART';
    element.addEventListener('click', ()=> {
        restart()
    })
    return element;
}

