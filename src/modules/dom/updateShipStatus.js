export function updateShipStatus(game){
    const playerShips = document.querySelectorAll(".player1-ship-container .ship-preview");
    const cpuShips = document.querySelectorAll(".player2-ship-container .ship-preview");

    playerShips.forEach(shipPreview => {
        const id = shipPreview.dataset.shipId;

        const shipObj = game.player1.gameboard.ships.find(ship => ship.id === id);

        if(shipObj && shipObj.isSunk()) shipPreview.classList.add("sunk");
    });

    cpuShips.forEach(shipPreview => {
        const id = shipPreview.dataset.shipId;

        const shipObj = game.player2.gameboard.ships.find(ship => ship.id == id);

        if(shipObj && shipObj.isSunk()) shipPreview.classList.add("sunk");
    });
}