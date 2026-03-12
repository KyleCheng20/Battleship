import { currentOrientation } from "../utils/shipOrientation";

export function updateShipPreviewOrientation(){
    const ships = document.querySelectorAll(".ship-preview");

    ships.forEach(ship => {
        if(currentOrientation === "horizontal"){
            ship.style.width = `${ship.dataset.length * 40}px`;
            ship.style.height = "40px";
        } else{
            ship.style.width = "40px";
            ship.style.height = `${ship.dataset.length * 40}px`;
        }
    });
}