export function startGameBtn(game){
    const btn = document.querySelector(".start-game-btn");
    const statusText = document.querySelector(".status-text");

    btn.addEventListener("click", () => {
        if(game.player1.gameboard.ships.length < 5){
            statusText.textContent = "Place all your ships first";
            return;
        }

        game.setupPhase = false;
    });
}