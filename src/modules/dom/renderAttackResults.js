export function renderAttackResults(playerBoard, gameboard){
    const cells = playerBoard.querySelectorAll(".cell");

    cells.forEach(cell => {
        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        const attackCoord = `${x},${y}`;

        if(gameboard.hitAttacks.includes(attackCoord)) cell.classList.add("hit");

        if(gameboard.missedAttacks.includes(attackCoord)) cell.classList.add("miss");
    });
}