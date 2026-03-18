import { currentOrientation } from "../utils/shipOrientation";

export function updateShipPreviewOrientation(){
    const ships = document.querySelectorAll(".player1-ship-container .ship-preview");
    const container = document.querySelector(".player1-ship-container");

    if(currentOrientation === "vertical") container.classList.add("vertical-layout");
    else container.classList.remove("vertical-layout");

    ships.forEach(ship => {
        ship.classList.toggle("vertical", currentOrientation === "vertical");
        ship.classList.toggle("horizontal", currentOrientation === "horizontal");
    });
}