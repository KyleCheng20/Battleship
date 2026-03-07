import { placeRandomShips } from "../utils/placeRandomShips";
import { renderShips } from "./renderShips";

export function randomizeShipsBtn(game){
    const btn = document.querySelector(".randomize-ships-btn");

    btn.addEventListener("click", () => {
        game.player1.gameboard.board = {};
        game.player1.gameboard.ships = [];
        game.player1.gameboard.hitAttacks = [];
        game.player1.gameboard.missedAttacks = [];
        document.querySelector(".player1-ship-container").innerHTML = "";

        placeRandomShips(game.player1.gameboard);

        const playerBoard = document.querySelector(".player1-board");

        playerBoard.querySelectorAll(".cell").forEach(cell => cell.classList.remove("ship"));

        renderShips(document.querySelector(".player1-board"), game.player1.gameboard);
    });
}