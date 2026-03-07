import { renderAttackResults } from "./renderAttackResults";

export function playerAttack(game){
    const playerBoard = document.querySelector(".player1-board");
    const opponentBoard = document.querySelector(".player2-board");

    const opponentCells = opponentBoard.querySelectorAll(".cell");

    opponentCells.forEach(cell => {
        cell.addEventListener("click", () => {

            // Prevent player from clicking during cpu turn
            if(game.currentPlayer !== game.player1) return;

            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            game.playTurn([x, y]);

            renderAttackResults(opponentBoard, game.player2.gameboard);
            renderAttackResults(playerBoard, game.player2.gameboard);
        });
    });
}