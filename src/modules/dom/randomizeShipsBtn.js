import { placeRandomShips } from "../utils/placeRandomShips";
import { renderShips } from "./renderShips";

export function randomizeShipsBtn(game){
    const btn = document.querySelector(".randomize-ships-btn");

    btn.addEventListener("click", () => {
        if(!game.setupPhase) return;
        
        game.player1.gameboard.board = {};
        game.player1.gameboard.ships = [];
        game.player1.gameboard.hitAttacks = [];
        game.player1.gameboard.missedAttacks = [];

        placeRandomShips(game.player1.gameboard);

        const shipPreviews = document.querySelectorAll(".player1-ship-container .ship-preview");

        shipPreviews.forEach(preview => {
            const shipId = preview.dataset.shipId;

            // Check if that ship exists on the gameboard
            const shipExists = game.player1.gameboard.ships[shipId];

            if(shipExists){
                preview.classList.add("used");
                preview.draggable = false;
            }
        });

        const playerBoard = document.querySelector(".player1-board");

        playerBoard.querySelectorAll(".cell").forEach(cell => cell.classList.remove("ship"));

        renderShips(document.querySelector(".player1-board"), game.player1.gameboard);
    });
}