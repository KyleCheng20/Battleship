import { clearPreview } from "./shipHoverPreview";

export let currentDraggedShipLength = null;

export function enableShipDrag(){
    const ships = document.querySelectorAll(".ship-preview");

    ships.forEach(ship => {
        if(ship.classList.contains("used")) return;
        
        ship.addEventListener("dragstart", (event) => {
            currentDraggedShipLength = Number(ship.dataset.length);

            event.dataTransfer.setData("shipLength", ship.dataset.length);

            event.target.classList.add("dragging");
        });

        ship.addEventListener("dragend", () => {
            currentDraggedShipLength = null;
            clearPreview(document.querySelector(".player1-board"));
            ship.classList.remove("dragging");
        });
    });
}