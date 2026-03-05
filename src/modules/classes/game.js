export class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
    }

    switchTurn(){
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    playTurn(coordinate){
        const opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;

        const wasHit = this.currentPlayer.attack(opponent, coordinate);

        if(!wasHit && !opponent.gameboard.allShipsSunk()) this.switchTurn();
    }

    isGameOver(){
        return this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk();
    }
}