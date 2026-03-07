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
        let opponent = this.currentPlayer === this.player1 ? this.player2 : this.player1;

        let wasHit = this.currentPlayer.attack(opponent, coordinate);

        // Only switch turns if it was a miss and game is not over
        if(!wasHit && !opponent.gameboard.allShipsSunk()) this.switchTurn();

        if(this.isGameOver()) return;

        // CPU turn
        while(this.currentPlayer === this.player2 && !this.isGameOver()){
            opponent = this.player1;
            const cpuHit = this.currentPlayer.attack(opponent);
            if(!cpuHit && !opponent.gameboard.allShipsSunk()){
                this.switchTurn();
                break;
            } 
        }
    }

    isGameOver(){
        return this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk();
    }
}

