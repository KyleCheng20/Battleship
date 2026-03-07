export function enableShipDrag(){
    const ships = document.querySelectorAll(".ship-preview");

    ships.forEach(ship => {
        ship.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("shipLength", ship.dataset.length);
        });
    });
}