import { startGame } from "../utils/gameSetup";
import { createBoard } from "./createBoard";
import { renderShips } from "./renderShips";
import { playerAttack } from "./playerAttack";

export function displayApp(){
    const game = startGame();

    const player1Board = document.querySelector(".player1-board");
    const player2Board = document.querySelector(".player2-board");

    createBoard(player1Board);
    createBoard(player2Board);

    renderShips(player1Board, game.player1.gameboard);

    playerAttack(game);

}