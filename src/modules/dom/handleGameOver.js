export function handleGameOver(game){
    if(!game.isGameOver()) return;

    const gameOverModal = document.querySelector(".game-over-modal");
    const winnerText = document.querySelector(".winner-text");
    const playAgainBtn = document.querySelector(".play-again-btn");

    if(game.player1.gameboard.allShipsSunk()) winnerText.textContent = "CPU wins";
    else winnerText.textContent = "You win";

    gameOverModal.showModal();

    playAgainBtn.onclick = () => {
        location.reload();
    }
}