import { Gameboard } from "./gameBoard";

export class Player {
    constructor(name){
        this.name = name;
        this.gameboard = new Gameboard();
        this.previousAttacks = new Set();
    }
}

