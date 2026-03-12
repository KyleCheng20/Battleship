import { updateShipPreviewOrientation } from "./updateShipPreviewOrientation";

export function renderDragShips(shipContainer){
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach(length => {
        const ship = document.createElement("div");

        ship.classList.add("ship-preview");
        ship.draggable = true;
        ship.dataset.length = length;

        for(let i = 0; i < length; i++){
            const shipSegment = document.createElement("div");
            shipSegment.classList.add("ship-segment");
            ship.appendChild(shipSegment);
        }

        shipContainer.appendChild(ship);
    });
}