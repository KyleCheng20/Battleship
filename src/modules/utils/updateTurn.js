export function updateTurn(game){
    const player1TurnIndicator = document.querySelector(".player1-turn-indicator");
    const player2TurnIndicator = document.querySelector(".player2-turn-indicator");

    if(game.currentPlayer === game.player1){
        player1TurnIndicator.classList.add("active");
        player1TurnIndicator.querySelector(".turn-text").textContent = "It's your turn";
        player2TurnIndicator.classList.remove("active");
    } else{
        player2TurnIndicator.classList.add("active");
        player2TurnIndicator.querySelector(".turn-text").textContent = "It's CPU's turn";
        player1TurnIndicator.classList.remove("active");
    }
}