export function startGameBtn(game){
    const btn = document.querySelector(".start-game-btn");
    const statusText = document.querySelector(".status-text");
    const randomizeBtn = document.querySelector(".randomize-ships-btn");
    const rotateShipsBtn = document.querySelector(".rotate-ships-btn");
    const resetBtn = document.querySelector(".reset-board-btn");

    btn.addEventListener("click", () => {
        if(game.player1.gameboard.ships.length < 5){
            statusText.textContent = "Place all your ships first";
            return;
        }

        game.setupPhase = false;

        randomizeBtn.disabled = true;
        rotateShipsBtn.disabled = true;
        resetBtn.disabled = true;

        statusText.textContent = "Game started!";
    });
}