import { startGame } from "../utils/gameSetup";
import { createBoard } from "./createBoard";
import { playerAttack } from "./playerAttack";
import { renderPlayerShips, renderCPUShips } from "./renderPreviewShips";
import { enableBoardDrop } from "./enableBoardDrop";
import { enableShipDrag } from "./enableShipDrag";
import { randomizeShipsBtn } from "./randomizeShipsBtn";
import { startGameBtn } from "./startGameBtn";
import { rotateShipsBtn } from "./rotateShipsBtn";
import { rotateShipsKey } from "./rotateShipsKey";
import { updateShipPreviewOrientation } from "./updateShipPreviewOrientation";
import { resetBtn } from "./resetBtn";

export function displayApp(){
    const game = startGame();
    
    const difficultyModal = document.querySelector(".difficulty-selector-modal");
    difficultyModal.showModal();

    const difficultyBtns = document.querySelectorAll(".difficulty-btn");
    difficultyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            game.cpuDifficulty = btn.dataset.difficulty;
            difficultyModal.close();
        });
    });

    const player1Board = document.querySelector(".player1-board");
    const player2Board = document.querySelector(".player2-board");

    createBoard(player1Board);
    createBoard(player2Board);

    renderPlayerShips(document.querySelector(".player1-ship-container"));
    renderCPUShips(document.querySelector(".player2-ship-container"));
    updateShipPreviewOrientation();

    enableShipDrag();
    enableBoardDrop(game);

    randomizeShipsBtn(game);
    rotateShipsBtn();
    rotateShipsKey();
    resetBtn(game);
    startGameBtn(game);

    playerAttack(game);
}