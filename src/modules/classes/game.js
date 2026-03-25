export class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        this.setupPhase = true;
    }

    switchTurn(){
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    playTurn(coordinate){
        let opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;

        let result;

        if(this.currentPlayer === this.player2) result = this.player2.attack(opponent, this.cpuDifficulty);
        else result = this.player1.attack(opponent, coordinate);

        // Normalize result (works for both object + boolean)
        const wasHit = result?.hit ?? result;

        // Only switch turns if miss and game not over
        if(!wasHit && !opponent.gameboard.allShipsSunk()){
            this.switchTurn();
        }

        if(this.isGameOver()) return;

        return { hit: wasHit };
    }

    isGameOver(){
        return this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk();
    }
}

