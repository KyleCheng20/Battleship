import { Player } from "./player";

export class HumanPlayer extends Player {
    constructor(name){
        super(name);
    }

    attack(opponent, coordinate){
        return opponent.gameboard.receiveAttack(coordinate);
    }
}