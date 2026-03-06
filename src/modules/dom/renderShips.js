export function renderShips(playerBoard, gameboard){
    const cells = playerBoard.querySelectorAll(".cell");

    cells.forEach(cell => {
        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        const coords = `${x},${y}`;

        if(gameboard.board[coords]){
            cell.classList.add("ship");
        }
    });
}