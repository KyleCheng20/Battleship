import { startGame } from "../utils/gameSetup";
import { createBoard } from "./createBoard";

export function displayApp(){
    const game = startGame();

    const player1Board = document.querySelector(".player1-board");
    const player2Board = document.querySelector(".player2-board");

    createBoard(player1Board);
    createBoard(player2Board);

    return game;
}