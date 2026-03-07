import { Ship } from "../classes/ship";
import { renderShips } from "./renderShips";

export function enableBoardDrop(game){
    const cells = document.querySelectorAll(".player1-board .cell");

    cells.forEach(cell => {
        cell.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        cell.addEventListener("drop", (event) => {
            event.preventDefault();

            if(!game.setupPhase) return;


            const length = Number(event.dataTransfer.getData("shipLength"));
            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            try{
                if(game.player1.gameboard.ships.length >= 5) return;
                
                const ship = new Ship(length);

                game.player1.gameboard.placeShip(ship, [x, y], "horizontal");

                renderShips(document.querySelector(".player1-board"), game.player1.gameboard);

                const draggingShip = document.querySelector(".dragging");
                if(draggingShip) draggingShip.remove();

            } catch(error){
                console.log("Invalid placement")
            }
        });

    });
}