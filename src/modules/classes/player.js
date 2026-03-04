import { Gameboard } from "./gameBoard";

export class Player {
    constructor(name, playerType){
        this.name = name;
        this.gameboard = new Gameboard();
        this.playerType = playerType;
    }

    attack(opponent, coordinate){
        if(this.playerType === 'cpu'){
            const xCoord = Math.floor(Math.random() * 10);
            const yCoord = Math.floor(Math.random() * 10);
            const cpuCoord = [xCoord, yCoord];

            opponent.gameboard.receiveAttack(cpuCoord);
        } else {
            opponent.gameboard.receiveAttack(coordinate);
        }

    }
}