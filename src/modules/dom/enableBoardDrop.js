import { Ship } from "../classes/ship";
import { renderShips } from "./renderShips";
import { clearPreview } from "./shipHoverPreview";
import { showPreview } from "./shipHoverPreview";
import { currentDraggedShipLength } from "./enableShipDrag";
import { currentOrientation } from "../utils/shipOrientation";

export function enableBoardDrop(game){
    const cells = document.querySelectorAll(".player1-board .cell");

    cells.forEach(cell => {
        cell.addEventListener("dragover", (event) => {
            event.preventDefault();

            const length = currentDraggedShipLength;
            if(!length) return;

            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            showPreview(document.querySelector(".player1-board"), x, y, length);
        });

        cell.addEventListener("dragleave", () => {
            clearPreview(document.querySelector(".player1-board"));
        });

        cell.addEventListener("drop", (event) => {
            event.preventDefault();

            clearPreview(document.querySelector(".player1-board"));

            if(!game.setupPhase) return;

            const length = Number(event.dataTransfer.getData("shipLength"));
            if(!length) return;
            
            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            try{
                if(game.player1.gameboard.ships.length >= 5) return;
                
                const draggingShip = document.querySelector(".dragging");
                if(!draggingShip) return;

                const shipId = draggingShip.dataset.shipId;
                const ship = new Ship(length);
                ship.id = shipId;

                game.player1.gameboard.placeShip(ship, [x, y], currentOrientation);

                renderShips(document.querySelector(".player1-board"), game.player1.gameboard);

                // Mark ships as used after dropping onto the board
                if(draggingShip){
                    draggingShip.classList.remove("dragging");
                    draggingShip.classList.add("used");
                    draggingShip.draggable = false;
                } 

            } catch(error){
                console.log("Invalid placement")
            }
        });

    });
}