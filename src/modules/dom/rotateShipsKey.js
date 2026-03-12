import { rotateShips } from "../utils/shipOrientation";
import { updateShipPreviewOrientation } from "./updateShipPreviewOrientation";

export function rotateShipsKey(){
    document.addEventListener("keydown", (event) => {
        if(event.key.toLowerCase() === "r"){
            rotateShips();
            updateShipPreviewOrientation();
        }
    });
}