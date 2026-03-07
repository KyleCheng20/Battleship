import { startGame } from "../utils/gameSetup";
import { createBoard } from "./createBoard";
import { renderShips } from "./renderShips";
import { playerAttack } from "./playerAttack";
import { renderDragShips } from "./renderDragShips";
import { enableBoardDrop } from "./enableBoardDrop";
import { enableShipDrag } from "./enableShipDrag";
import { randomizeShipsBtn } from "./randomizeShipsBtn";
import { startGameBtn } from "./startGameBtn";

export function displayApp(){
    const game = startGame();

    const player1Board = document.querySelector(".player1-board");
    const player2Board = document.querySelector(".player2-board");

    createBoard(player1Board);
    createBoard(player2Board);

    renderDragShips(document.querySelector(".player1-ship-container"));

    enableShipDrag();
    enableBoardDrop(game);

    randomizeShipsBtn(game);
    startGameBtn(game);

    playerAttack(game);
}