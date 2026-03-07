import { placeRandomShips } from "../utils/placeRandomShips";
import { renderShips } from "./renderShips";

export function randomizeShipsBtn(game){
    const btn = document.querySelector(".randomize-ships-btn");

    btn.addEventListener("click", () => {
        game.player1.gameboard.board = {};
        game.player1.gameboard.ships = [];

        placeRandomShips(game.player1.gameboard);

        renderShips(document.querySelector(".player1-board"), game.player1.gameboard);
    });
}