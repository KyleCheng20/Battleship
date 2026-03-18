export function renderPlayerShips(shipContainer){
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach((length, index) => {
        const ship = document.createElement("div");

        ship.classList.add("ship-preview");
        ship.draggable = true;
        ship.dataset.length = length;
        ship.dataset.shipId = index;

        for(let i = 0; i < length; i++){
            const shipSegment = document.createElement("div");
            shipSegment.classList.add("ship-segment");
            ship.appendChild(shipSegment);
        }

        shipContainer.appendChild(ship);
    });
}

export function renderCPUShips(shipContainer){
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach((length, index) => {
        const ship = document.createElement("div");

        ship.classList.add("ship-preview");
        ship.dataset.shipId = index;

        for(let i = 0; i < length; i++){
            const shipSegment = document.createElement("div");
            shipSegment.classList.add("ship-segment");
            ship.appendChild(shipSegment);
        }

        shipContainer.appendChild(ship);
    });
}