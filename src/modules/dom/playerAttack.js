import { renderAttackResults } from "./renderAttackResults";

async function cpuTurn(game, playerBoard, opponentBoard){
    const statusText = document.querySelector(".status-text");

    while(game.currentPlayer === game.player2 && !game.isGameOver()){
        statusText.textContent = "CPU is thinking...";

        await new Promise(resolve => setTimeout(resolve, 1600));

        const cpuHit = game.playTurn();

        renderAttackResults(opponentBoard, game.player2.gameboard);
        renderAttackResults(playerBoard, game.player1.gameboard);

        if(cpuHit){
            statusText.textContent = "CPU landed a hit!";
            await new Promise(resolve => setTimeout(resolve, 1000));

            if(game.currentPlayer === game.player2) await new Promise(resolve => setTimeout(resolve, 1000));
        } else{
            statusText.textContent = "CPU missed!";
            await new Promise(resolve => setTimeout(resolve, 1200));
            break; 
        }
    }

    if(!game.isGameOver() && game.currentPlayer === game.player1) statusText.textContent = "Your turn";
}

export function playerAttack(game){
    const playerBoard = document.querySelector(".player1-board");
    const opponentBoard = document.querySelector(".player2-board");

    const opponentCells = opponentBoard.querySelectorAll(".cell");

    opponentCells.forEach(cell => {
        cell.addEventListener("click", () => {
            if(game.setupPhase) return;

            // Prevent player from clicking during cpu turn
            if(game.currentPlayer !== game.player1) return;

            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);
            const attackCoord = `${x},${y}`;

            if(game.player2.gameboard.hitAttacks.includes(attackCoord) || game.player2.gameboard.missedAttacks.includes(attackCoord)) return;

            const hit = game.playTurn([x, y]);

            renderAttackResults(opponentBoard, game.player2.gameboard);
            renderAttackResults(playerBoard, game.player1.gameboard);

            if(game.currentPlayer === game.player2) cpuTurn(game, playerBoard, opponentBoard);
        });
    });
}