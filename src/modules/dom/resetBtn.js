import { Gameboard } from "../classes/gameBoard";
import { renderDragShips } from "./renderDragShips";
import { createBoard } from "./createBoard";
import { enableShipDrag } from "./enableShipDrag";
import { enableBoardDrop } from "./enableBoardDrop";
import { updateShipPreviewOrientation } from "./updateShipPreviewOrientation";

export function resetBtn(game){
    const btn = document.querySelector(".reset-board-btn");
    const board = document.querySelector(".player1-board");
    const shipContainer = document.querySelector(".player1-ship-container");

    btn.addEventListener("click", () => {
        game.player1.gameboard = new Gameboard();

        board.innerHTML = "";
        createBoard(board);

        shipContainer.innerHTML = "";
        renderDragShips(shipContainer);

        enableShipDrag();
        enableBoardDrop(game);
        updateShipPreviewOrientation();
    });
}