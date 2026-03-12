import { rotateShips } from "../utils/shipOrientation";
import { updateShipPreviewOrientation } from "./updateShipPreviewOrientation";

export function rotateShipsBtn(){
    const btn = document.querySelector(".rotate-ships-btn");

    btn.addEventListener("click", () => {
        rotateShips();
        updateShipPreviewOrientation();
    });
}