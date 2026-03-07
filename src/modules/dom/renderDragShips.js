export function renderDragShips(shipContainer){
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach(length => {
        const ship = document.createElement("div");

        ship.classList.add("ship-preview");
        ship.draggable = true;
        ship.dataset.length = length;
        ship.style.width = `${length * 40}px`;

        shipContainer.appendChild(ship);
    });
}