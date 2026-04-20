import { renderPlayerShips } from "./renderPreviewShips";
import { updateTurn } from "../utils/updateTurn";

export function startGameBtn(game){
    const btn = document.querySelector(".start-game-btn");
    const statusText = document.querySelector(".status-text");
    const randomizeBtn = document.querySelector(".randomize-ships-btn");
    const rotateShipsBtn = document.querySelector(".rotate-ships-btn");
    const resetBtn = document.querySelector(".reset-board-btn");
    const previewContainer = document.querySelector(".player1-ship-container");

    btn.addEventListener("click", () => {
        if(game.player1.gameboard.ships.length < 5){
            statusText.textContent = "Place all your ships first";
            return;
        }

        game.setupPhase = false;

        previewContainer.classList.remove("vertical-layout");

        // Reset ship preview orientation back to horizontal if started the game with vertical orientation
        document.querySelectorAll(".ship-preview").forEach(ship => ship.classList.remove("vertical"))
        previewContainer.innerHTML = "";
        renderPlayerShips(previewContainer);

        randomizeBtn.disabled = true;
        rotateShipsBtn.disabled = true;
        resetBtn.disabled = true;
        btn.disabled = true;

        statusText.textContent = "Game started!";
        updateTurn(game);
    });
}