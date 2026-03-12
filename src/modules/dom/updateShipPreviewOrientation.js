import { currentOrientation } from "../utils/shipOrientation";

export function updateShipPreviewOrientation(){
    const ships = document.querySelectorAll(".ship-preview");

    ships.forEach(ship => {
        ship.style.flexDirection = currentOrientation === "horizontal" ? "row" : "column";
    });
}